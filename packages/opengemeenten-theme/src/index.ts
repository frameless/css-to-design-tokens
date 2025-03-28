import postcss from 'postcss';
import { ast, render, createParser } from 'css-selector-parser';
import type { AcceptedPlugin } from 'postcss';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { ScrapedWebsite } from './scrape-websites';
import set from 'lodash-es/set';
import type { DesignTokenTree } from '@nl-design-system-unstable/tokens-lib/dist/design-tokens';
import { designTokens, Mapping } from './mappings';

const treeTokens = (tokens: FlatTokens): DesignTokenTree => {
  const tree: DesignTokenTree = {};
  for (let key in tokens) {
    const item = tokens[key];
    set(tree, key, item);
  }
  return tree;
};
const parse = createParser();

const normalizeWhitespace = (str: string) => str.replace(/\s+/g, ' ').trim();

// FIXME: This is a very naive implementation of normalizing CSS selector strings, implement something based on a CSS parser for more accurate results
const normalizeSelector = normalizeWhitespace;

const splitSelectors = (str: string) => {
  try {
    return parse(str).rules.map((rule) => render(ast.selector({ rules: [rule] })));
  } catch (e) {
    return [str];
  }
};

const map = designTokens.reduce((map, item) => {
  const selector = normalizeSelector(item.selector);
  let arr = map.get(selector);
  if (arr) {
    arr.push(item);
  } else {
    map.set(selector, [item]);
  }
  return map;
}, new Map<string, Mapping[]>());

const cssVariableMap = designTokens
  .filter((item) => item.selector === ':root')
  .reduce((map, item) => {
    map.set(item.property, item.name);
    return map;
  }, new Map<string, string>());

interface FlatTokens {
  [index: string]: { $value: string; $comment?: string };
}
export const findCssVariables = (fileName: string): AcceptedPlugin => {
  return (css) => {
    const tokens: FlatTokens = {};

    css.walk((node) => {
      if (node.type === 'rule') {
        const media =
          node.parent.type === 'atrule' && node.parent.name === 'media' ? `${node.parent.params}` : undefined;

        splitSelectors(node.selector).forEach((selector) => {
          const interestingMappings = map.get(selector);
          // const customProperties = arr?.map(({ customProperty }) => customProperty);

          // const customPropertyNodes = node.nodes.filter(
          //   (node) => node.type === 'decl' && customProperties.includes(node.prop),
          // );
          interestingMappings
            ?.filter((mapping) => mapping.media === media)
            .forEach((mapping) => {
              const customPropertyNode = node.nodes.findLast(
                (node) => node.type === 'decl' && node.prop === mapping.property,
              );

              if (customPropertyNode) {
                if (tokens.hasOwnProperty(mapping.name)) {
                  const newValue = customPropertyNode.value;
                  const oldValue = tokens[mapping.name].$value;
                  if (newValue !== oldValue) {
                    console.warn(
                      `Collision: ${mapping.name}\nOld:\n\t${oldValue}\n\t${tokens[mapping.name].$comment}\n\nNew:\n\t${newValue}\n\t${selector}\n`,
                    );
                  }
                }
                tokens[mapping.name] = {
                  $comment: selector,
                  $value: customPropertyNode.value.trim(),
                };
              }
            });
        });
      }
    });

    for (let key in tokens) {
      const value = tokens[key].$value;

      tokens[key].$value = value.replace(/var\(([^,)]+)(?:,[^)]+)?\)/gi, (_, property) => {
        const tokenRef = cssVariableMap.get(property);
        return tokenRef ? `{${tokenRef}}` : _;
      });
    }

    // TODO: Remove this workaround for Style Dictionary adding extra quote marks in CSS
    tokens['basis.typography.font-family.default'] = {
      $value: tokens['basis.typography.font-family.default'].$value.replace(/"/g, ''),
    };
    tokens['basis.typography.font-family.heading'] = {
      $value: tokens['basis.typography.font-family.heading'].$value.replace(/"/g, ''),
    };

    const tree = treeTokens(tokens);

    writeFile(
      fileName,
      JSON.stringify(
        {
          ['opengemeenten']: tree,
        },
        null,
        2,
      ),
    );
    console.log(`Generated ${fileName}`);
  };
};

const init = async () => {
  await mkdir('./dist/', { recursive: true });
  await mkdir('./tmp/', { recursive: true });

  const scrapedWebsites = JSON.parse(await readFile('./tmp/scraped.json', 'utf-8')) as ScrapedWebsite[];

  scrapedWebsites.forEach(async ({ css, url }) => {
    try {
      const filePart = new URL(url).hostname;
      const fileName = `./dist/${filePart}.tokens.json`;

      const cssPath = `./tmp/${filePart}.css`;
      await writeFile(`./tmp/${filePart}.css`, css);

      console.log(`Created: ${cssPath}`);
      postcss([findCssVariables(fileName)])
        // .process(css, { from, to })
        .process(css)
        .then(
          (result) => {
            // console.log(result.css);
          },
          (e) => {
            console.log(`failure for ${url}`);
          },
        );
    } catch (e) {
      console.log(`failure for ${url}`);
    }
  });
};

init();

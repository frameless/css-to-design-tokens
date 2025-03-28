import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { typeDtcgDelegate } from 'style-dictionary/utils';
import { readFile } from 'node:fs/promises';
import pLimit from 'p-limit';

const stringSort = (a: string, b: string) => (a === b ? 0 : a > b ? 1 : -1);

const sortByName = (a: string, b: string) => stringSort(a.name, b.name);

const createConfig = ({
  backwardsCompatible = false,
  selector,
  source = ['src/**/tokens.json', 'src/**/*.tokens.json'],
  buildPath = 'dist/',
  className = '',
  useTokensStudioTransformGroup = true,
}: {
  backwardsCompatible?: boolean;
  selector: string;
  source?: string[];
  buildPath?: string;
  className?: string;
  useTokensStudioTransformGroup?: boolean;
}) => {
  const prefix = selector ? selector.replace(/^\.(.+)-theme/, '$1') : '';
  let themeName = className || (prefix ? `${prefix}-theme` : 'theme');
  const transformGroup = useTokensStudioTransformGroup && !backwardsCompatible ? 'tokens-studio' : '';

  const legacyPlatforms = {
    legacyJson: {
      transformGroup: transformGroup,
      transforms: ['name/camel', 'attribute/cti'],
      buildPath,
      files: [
        {
          destination: 'index.json',
          format: 'json/list',
        },
      ],
    },
    legacyCss: {
      transformGroup: transformGroup,
      transforms: ['name/kebab'],
      buildPath,
      files: [
        {
          destination: 'design-tokens.css',
          format: 'css/variables',
          options: {
            selector: `.${themeName}`,
            outputReferences: true,
          },
        },
      ],
    },
    legacyLess: {
      transformGroup: transformGroup,
      transforms: ['name/kebab'],
      buildPath,
      files: [
        {
          destination: 'index.less',
          format: 'less/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    legacyScss: {
      transformGroup: transformGroup,
      transforms: ['name/kebab'],
      buildPath,
      files: [
        {
          destination: 'index.scss',
          format: 'scss/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    legacyJs: {
      transformGroup: transformGroup,
      transforms: ['name/camel'],
      buildPath,
      files: [
        {
          destination: 'index.js',
          format: 'javascript/es6',
        },
      ],
    },
  };

  return {
    log: {
      verbosity: 'verbose',
    },
    hooks: {
      formats: {
        'json/list': function ({ dictionary }) {
          return JSON.stringify(dictionary.allTokens.sort(sortByName), null, '  ');
        },
      },
    },
    source,
    platforms: {
      // ...(backwardsCompatible ? legacyPlatforms : {}),
      // js: {
      //   transformGroup: transformGroup,
      //   transforms: ['name/camel'],
      //   buildPath,
      //   files: [
      //     {
      //       destination: 'variables.cjs',
      //       format: 'javascript/module-flat',
      //     },
      //     {
      //       destination: 'variables.mjs',
      //       format: 'javascript/es6',
      //     },
      //   ],
      // },
      // tokenTree: {
      //   transformGroup: transformGroup,
      //   transforms: ['name/camel'],
      //   buildPath,
      //   files: [
      //     {
      //       format: 'javascript/module',
      //       destination: 'tokens.cjs',
      //     },
      //   ],
      // },
      // json: {
      //   transformGroup: transformGroup,
      //   transforms: ['name/camel'],
      //   buildPath,
      //   files: [
      //     {
      //       destination: 'tokens.json',
      //       format: 'json',
      //     },
      //     {
      //       destination: 'list.json',
      //       format: 'json/list',
      //     },
      //     {
      //       destination: 'variables.json',
      //       format: 'json/flat',
      //     },
      //   ],
      // },
      css: {
        transformGroup: transformGroup,
        transforms: ['name/kebab'],
        buildPath,
        files: [
          {
            destination: 'theme.css',
            format: 'css/variables',
            options: {
              selector: `.${themeName}`,
              outputReferences: true,
            },
          },
          // {
          //   destination: 'variables.css',
          //   format: 'css/variables',
          //   options: {
          //     selector: `:root`,
          //     outputReferences: true,
          //   },
          // },
        ],
      },
      // scss: {
      //   transformGroup: transformGroup,
      //   transforms: ['name/kebab'],
      //   buildPath,
      //   files: [
      //     {
      //       destination: '_variables.scss',
      //       format: 'scss/variables',
      //       options: {
      //         outputReferences: true,
      //         themeable: true,
      //       },
      //     },
      //   ],
      // },
      // 'scss-theme-mixin': {
      //   transforms: ['name/kebab'],
      //   buildPath,
      //   files: [
      //     {
      //       destination: '_mixin.scss',
      //       format: 'css/variables',
      //       options: {
      //         selector: `@mixin ${themeName}`,
      //         outputReferences: true,
      //       },
      //     },
      //   ],
      // },
      // less: {
      //   transformGroup: transformGroup,
      //   transforms: ['name/kebab'],
      //   buildPath,
      //   files: [
      //     {
      //       destination: 'variables.less',
      //       format: 'less/variables',
      //       options: {
      //         outputReferences: true,
      //       },
      //     },
      //   ],
      // },
      // typescript: {
      //   transforms: ['name/camel'],
      //   transformGroup: 'js',
      //   buildPath,
      //   files: [
      //     {
      //       format: 'typescript/es6-declarations',
      //       destination: 'variables.d.ts',
      //     },
      //     {
      //       format: 'typescript/module-declarations',
      //       destination: 'tokens.d.ts',
      //     },
      //   ],
      // },
    },
  };
};

const build = async ({ tokensFile, prefix, buildPath }: { buildPath: string; tokensFile: string; prefix: string }) => {
  StyleDictionary.registerPreprocessor({
    name: 'dtcg-delegate',
    preprocessor: typeDtcgDelegate,
  });

  register(StyleDictionary, {
    excludeParentKeys: true,
  });

  let sd = new StyleDictionary({
    ...createConfig({
      buildPath,
      className: `${prefix}-theme`,
    }),
    preprocessors: ['tokens-studio', 'dtcg-delegate'],
    source: [
      './node_modules/@nl-design-system-unstable/basis-design-tokens/figma/**/*.tokens.json',
      './src/*.tokens.json',
      tokensFile,
    ],
  });

  await sd.cleanAllPlatforms();
  await sd.buildAllPlatforms();
};

const init = async () => {
  const limit = pLimit(1);
  const themes = [
    { prefix: 'barneveld', tokensFile: 'www.barneveld.nl' },
    { prefix: 'bergen', tokensFile: 'www.bergen-nh.nl' },
    { prefix: 'bloemendaal', tokensFile: 'www.bloemendaal.nl' },
    { prefix: 'bunnik', tokensFile: 'www.bunnik.nl' },
    { prefix: 'castricum', tokensFile: 'www.castricum.nl' },
    { prefix: 'debilt', tokensFile: 'www.debilt.nl' },
    { prefix: 'dijkenwaard', tokensFile: 'www.dijkenwaard.nl' },
    { prefix: 'ede', tokensFile: 'www.ede.nl' },
    { prefix: 'ermelo', tokensFile: 'www.ermelo.nl' },
    { prefix: 'harderwijk', tokensFile: 'www.harderwijk.nl' },
    { prefix: 'heemskerk', tokensFile: 'www.heemskerk.nl' },
    { prefix: 'heemstede', tokensFile: 'www.heemstede.nl' },
    { prefix: 'heiloo', tokensFile: 'www.heiloo.nl' },
    { prefix: 'houten', tokensFile: 'www.houten.nl' },
    { prefix: 'heusden', tokensFile: 'www.heusden.nl' },
    { prefix: 'katwijk', tokensFile: 'www.katwijk.nl' },
    { prefix: 'medemblik', tokensFile: 'www.medemblik.nl' },
    { prefix: 'nieuwegein', tokensFile: 'www.nieuwegein.nl' },
    { prefix: 'nissewaard', tokensFile: 'www.nissewaard.nl' },
    { prefix: 'rhenen', tokensFile: 'www.rhenen.nl' },
    { prefix: 'schouwen', tokensFile: 'www.schouwen-duiveland.nl' },
    { prefix: 'soest', tokensFile: 'www.soest.nl' },
    { prefix: 'tholen', tokensFile: 'www.tholen.nl' },
    { prefix: 'uitgeest', tokensFile: 'www.uitgeest.nl' },
    { prefix: 'veenendaal', tokensFile: 'www.veenendaal.nl' },
    { prefix: 'voerendaal', tokensFile: 'www.voerendaal.nl' },
    { prefix: 'gemeentewestland', tokensFile: 'www.gemeentewestland.nl' },
    { prefix: 'wijkbijduurstede', tokensFile: 'www.wijkbijduurstede.nl' },
    { prefix: 'woudenberg', tokensFile: 'www.woudenberg.nl' },
    { prefix: 'zeewolde', tokensFile: 'www.zeewolde.nl' },
    { prefix: 'zeist', tokensFile: 'www.zeist.nl' },
    { prefix: 'lenteveld', tokensFile: 'www.lenteveld.nl' },
  ];
  themes.forEach(({ prefix, tokensFile }) =>
    limit(() =>
      build({
        prefix,
        tokensFile: `./dist/${tokensFile}.tokens.json`,
        buildPath: `./dist/${prefix}/`,
      }),
    ),
  );
};

init();

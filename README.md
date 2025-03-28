<!-- @license CC0-1.0 -->

# CSS to Design Tokens conversion

This codebase is organised as a monorepository with a pnpm workspace. The root directory contains infrastructure dependencies, for continuous integration.

The main codebase for this project is in `packages/opengemeenten-themes/`. Open this directory with the command line, to run the following `pnpm` commands.

## Getting started

First install all dependencies with [pnpm](https://pnpm.io/installation), using `pnpm install`.

## Overview

The process has the following steps:

1. For each theme, collect all the CSS files.
1. Create a Design Tokens JSON file.
1. Create a CSS file with CSS variables, as part of a NL Design System theme.

### Step 1: Collect CSS

Run `pnpm run scrape` to start the process. The domains to be scraped are configured in [`config/websites.json`](packages/opengemeenten-themes/config/websites.json). The main result is `src/scraped.json`, with an entry for each web page that contains the scraped CSS.

This step is about collecting all relevant CSS for a website. All CSS is compiled into one `.css` file in the `tmp/` directory, because the following steps currently only support one file as input.

This step currently has one naive implementation: scrape all the CSS from one web page. Problems with this approach:

- Frequently the result is incomplete, because not all CSS is included in the single web page.
- The process is slow, because it requires many HTTP requests.

When the original CSS for available all themes, the scraping is no longer needed.

## Step 2: Convert CSS to a `*.tokens.json` file

Run `pnpm run build:1` to run this step.

This step creates a Design Tokens JSON file for every entry in `tmp/scraped.json`.

The main output is a Design Tokens file at `dist/{domain}.tokens.json`.

The combined CSS is compiled into `tmp/{domain}.css` for debugging purposes.

This step is configured in [`config/mappings.json`](packages/opengemeenten-themes/config/mappings.json).

## Step 3: Design Tokens JSON to CSS files

Run `pnpm run build:2` to run this step.

This step creates a NL Design System theme packages for every `dist/*.tokens.json` file.

The main output is a Design Tokens file at `dist/{prefix}/theme.css`.

## Inspecting the results

Start the development server using `pnpm run start`.

Open the test page on: [http://127.0.0.1:8081/src/](http://127.0.0.1:8081/src/)

Open the design tokens table at: [http://127.0.0.1:8081/src/tokens-table.html](http://127.0.0.1:8081/src/tokens-table.html)

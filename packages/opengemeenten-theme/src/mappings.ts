import mappingJSON from '../config/mapping.json';

export interface Mapping {
  $comment?: string;
  name: string;
  selector: string;
  property: string;
  media?: string;
}

export const designTokens: Mapping[] = mappingJSON;

// TODO for `.page-header`
// --font-size: var(--root-font-size);
// --height: var(--root-page-header-height);
// --box-shadow: var(--root-box-shadow);
// TODO for `.page-footer`
// --font-size: var(--root-font-size);

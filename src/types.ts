export interface FlatTokens {
  [index: string]: string;
}

export interface ComponentVariant {
  id: string;
  flatTokens: FlatTokens;
  name: string;
  recommended?: boolean;
}

export interface VariantOptionGroup {
  id: string;
  variants: ComponentVariant[];
}

export type VariantsMap = Map<string, VariantOptionGroup>;

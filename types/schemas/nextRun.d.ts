/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface NextRun {
  pk?: number | string;
  index?: number;
  scheduled?: number;
  title?: string;
  engTitle?: string;
  category?: string;
  hardware?: string;
  duration?: string;
  runners?: {
    name?: string;
    twitch?: string;
    nico?: string;
    twitter?: string;
    [k: string]: any;
  }[];
  commentators?: {
    name?: string;
    twitch?: string;
    nico?: string;
    twitter?: string;
    [k: string]: any;
  }[];
  [k: string]: any;
}

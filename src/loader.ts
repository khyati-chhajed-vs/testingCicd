import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

let extensions = ['js'],
  resolveDirs = true;

let indexFiles = resolveDirs ? extensions.map((e) => `index.${e}`) : [];
let postfixes = extensions.map((e) => `.${e}`).concat(indexFiles.map((p) => `/${p}`));
let findPostfix = (specifier, context) =>
  (specifier.endsWith('/') ? indexFiles : postfixes).find((p) => {
    return existsSync(
      specifier.startsWith('/') ? specifier + p : join(dirname(fileURLToPath(context.parentURL)), specifier + p),
    );
  });

let prefixes = ['/', './', '../'];
export function resolve(specifier, context, nextResolve) {
  let postfix =
    (prefixes.some((p) => specifier.startsWith(p)) &&
      //&& !extname(basename(specifier))
      findPostfix(specifier, context)) ||
    '';

  return nextResolve(specifier + postfix);
}

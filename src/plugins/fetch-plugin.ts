import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: inputCode,
          };
        }
        // check to see if we have fetched and is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        // if cached return
        if (cachedResult) {
          return cachedResult;
        }
        // if not cached
        const { data, request } = await axios.get(args.path);
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        // store in cache
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};

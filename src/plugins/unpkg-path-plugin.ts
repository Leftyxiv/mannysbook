import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from 'localforage';

const fileCache = localforage.createInstance({
  name: 'filecache'
});


export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResolve", args);
        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" };
        }

        if (args.path.includes("./") || args.path.includes("../")) {
          return {
            namespace: "a",
            path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
          };
        }

        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
        // else if (args.path === "tiny-test-pkg") {
        //   return { path: "https://unpkg.com/tiny-test-pkg@1.0.0/index.js", namespace: "a" };
        // }
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
              const message = require('react');
              console.log(message);
            `,
          };
        }
        // check to see if we have fetched and is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path)


        // if cached return
        if(cachedResult){
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
        return result
      });
    },
  };
};

import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      input: './src/index',
      outDir: './dist',
    },
    {
      input: './src/cli',
      outDir: './dist',
    },
    {
      // mkdist builder transpiles file-to-file keeping original sources structure
      builder: 'mkdist',
      input: './src/lib',
      outDir: './dist/lib',
    },
  ],
  outDir: 'dist',
  declaration: true,
  clean: true,
})

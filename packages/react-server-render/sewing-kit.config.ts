import {createPackage, Runtime} from '@sewing-kit/config';

export default createPackage((pkg) => {
  pkg.entry({root: './src/index'});
  pkg.entry({root: './src/server', name: 'server', runtime: Runtime.Node});
});
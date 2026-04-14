import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default postcss([
  tailwindcss,
  autoprefixer,
]);
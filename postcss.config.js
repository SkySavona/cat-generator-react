module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: [
        'fixed', 'top-0', 'left-0', 'w-full', 'h-full', 'bg-[#87ceeb]', 'z-[1000]', 
        'flex', 'flex-col', 'justify-center', 'items-center', 'sm:hidden', 'absolute', 
        'top-[20px]', 'right-[20px]', 'text-[30px]', 'text-white', 'cursor-pointer', 
        'transition-colors', 'duration-300', 'ease-in-out', 'hover:text-[#ffdab9]', 
        'text-[24px]', 'my-[20px]', 'no-underline', 'hover:text-[#ffdab9]', 'cursor-not-allowed'
      ],
    }),
    require('cssnano')({
      preset: 'default',
    }),
  ],
};

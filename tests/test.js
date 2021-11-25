const postcss = require('postcss')

it('should generate proper collapsible padding styles', () => {
  postcss([
    require('tailwindcss')({
      purge: {
        enabled: true,
        options: {
          safelist: [
            'p-px',
            'px-px',
            'py-px',
            'p-4',
            'px-4',
            'py-4',
            'sm:p-px',
            'sm:px-px',
            'sm:py-px',
            'sm:p-4',
            'sm:px-4',
            'sm:py-4',
            '2xl:p-4',
            'collapsible:p-4',
            'collapsible:py-4',
            'sm:collapsible:p-4',
            'sm:collapsible:py-4',
            'md:collapsible:py-4',
            'lg:collapsible:py-4',
            'xl:collapsible:py-4',
            '2xl:collapsible:py-4',
            'collapsible:pt-8',
            'sm:collapsible:pb-16',
            'md:collapsible:pt-32',
            'lg:collapsible:pb-64',
          ],
          variables: true,
          keyframes: true,
        },
      },
      variants: {
        extend: {
          padding: ['collapsible'],
        },
      },
      plugins: [require('../')],
    }),
  ])
    .process('@tailwind utilities', { from: undefined })
    .then(({ css }) => {
      expect(css).toMatchSnapshot()
    })
})

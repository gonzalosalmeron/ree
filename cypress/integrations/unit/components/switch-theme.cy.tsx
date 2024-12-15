import ButtonTheme from '@/components/ui/button-theme'

describe('<ButtonTheme />', () => {
  beforeEach(() => {
    cy.mount(<ButtonTheme />)
    cy.get('[data-cy="btn-switch-theme"]').as('themeButtonThemne')
  })
  it('should toggle the theme when the button is clicked', () => {
    const expectedClasses = ['dark', 'random', 'light']
    expectedClasses.forEach((expectedClass) => {
      cy.get('@themeButtonThemne').click()
      cy.get('html').should('have.class', expectedClass)
    })
  })
})

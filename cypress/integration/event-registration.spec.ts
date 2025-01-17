import users from '../fixtures/users.json';
import event from '../fixtures/event.json';

describe('Event registration', () => {
    describe('720p res', () => {
        beforeEach(() => {
            cy.viewport(1280, 720);
        });

        context('Event form registration', () => {
            beforeEach(() => {
                cy.visit(`/events/${event.slug}`);
            });

            it('Popup form appears correctly', () => {
                cy.get('[data-cy=reg-btn]').click();
                cy.get('[data-cy=reg-form]').should('be.visible');

                cy.get('input[name=email]').should('be.visible');
                cy.get('input[name=firstName]').should('be.visible');
                cy.get('input[name=lastName]').should('be.visible');
                cy.get('select[name=degree]').should('be.visible');

                /*

                TODO: fix this.
                 
                Chakra hides radio and checkbox input beneath another element,
                therefore it will never be visible.

                cy.get('input[name=degreeYear]').should('be.visible');
                cy.get('input[name=terms1]').should('be.visible');
                cy.get('input[name=terms2]').should('be.visible');
                cy.get('input[name=terms3]').should('be.visible');

               */
            });

            users.bachelorDegrees.forEach((b) => {
                [1, 2, 3].forEach((y) => {
                    it(`User can sign up with valid input (degree = ${b}, degreeYear = ${y})`, () => {
                        cy.get('[data-cy=reg-btn]').click();
                        cy.get('[data-cy=reg-form]').should('be.visible');

                        cy.get('input[name=email]').type(`${b}${y}${users.validUser.email}`);
                        cy.get('input[name=firstName]').type(users.validUser.firstName);
                        cy.get('input[name=lastName]').type(users.validUser.lastName);
                        cy.get('select[name=degree]').select(b);
                        cy.get('input[name=degreeYear]').check(y.toString(), { force: true });
                        cy.get('input[name=terms1]').check({ force: true });
                        cy.get('input[name=terms2]').check({ force: true });
                        cy.get('input[name=terms3]').check({ force: true });

                        cy.get('button[type=submit]').click();

                        cy.get('li[class=chakra-toast]').contains('Påmeldingen din er registrert!');
                    });
                });
            });

            users.masterDegrees.forEach((b) => {
                [4, 5].forEach((y) => {
                    it(`User can sign up with valid input (degree = ${b}, degreeYear = ${y})`, () => {
                        cy.get('[data-cy=reg-btn]').click();
                        cy.get('[data-cy=reg-form]').should('be.visible');

                        cy.get('input[name=email]').type(`${b}${y}${users.validUser.email}`);
                        cy.get('input[name=firstName]').type(users.validUser.firstName);
                        cy.get('input[name=lastName]').type(users.validUser.lastName);
                        cy.get('select[name=degree]').select(b);
                        cy.get('input[name=degreeYear]').check(y.toString(), { force: true });
                        cy.get('input[name=terms1]').check({ force: true });
                        cy.get('input[name=terms2]').check({ force: true });
                        cy.get('input[name=terms3]').check({ force: true });

                        cy.get('button[type=submit]').click();

                        cy.get('li[class=chakra-toast]').contains('Påmeldingen din er registrert!');
                    });
                });
            });

            it(`User can sign up with valid input (degree = ${users.validKogniUser.degree}, degreeYear = ${users.validKogniUser.degreeYear})`, () => {
                cy.get('[data-cy=reg-btn]').click();
                cy.get('[data-cy=reg-form]').should('be.visible');

                cy.get('input[name=email]').type(users.validKogniUser.email);
                cy.get('input[name=firstName]').type(users.validKogniUser.firstName);
                cy.get('input[name=lastName]').type(users.validKogniUser.lastName);
                cy.get('select[name=degree]').select(users.validKogniUser.degree);
                cy.get('input[name=degreeYear]').check(users.validKogniUser.degreeYear.toString(), { force: true });
                cy.get('input[name=terms1]').check({ force: true });
                cy.get('input[name=terms2]').check({ force: true });
                cy.get('input[name=terms3]').check({ force: true });

                cy.get('button[type=submit]').click();

                cy.get('li[class=chakra-toast]').contains('Påmeldingen din er registrert!');
            });

            it(`User can sign up with valid input (degree = ${users.validArmninfUser.degree}, degreeYear = ${users.validArmninfUser.degreeYear})`, () => {
                cy.get('[data-cy=reg-btn]').click();
                cy.get('[data-cy=reg-form]').should('be.visible');

                cy.get('input[name=email]').type(users.validArmninfUser.email);
                cy.get('input[name=firstName]').type(users.validArmninfUser.firstName);
                cy.get('input[name=lastName]').type(users.validArmninfUser.lastName);
                cy.get('select[name=degree]').select(users.validArmninfUser.degree);
                cy.get('input[name=degreeYear]').check(users.validArmninfUser.degreeYear.toString(), { force: true });
                cy.get('input[name=terms1]').check({ force: true });
                cy.get('input[name=terms2]').check({ force: true });
                cy.get('input[name=terms3]').check({ force: true });

                cy.get('button[type=submit]').click();

                cy.get('li[class=chakra-toast]').contains('Påmeldingen din er registrert!');
            });

            it("User can't sign up if not all terms are accepted", () => {
                cy.get('[data-cy=reg-btn]').click();
                cy.get('[data-cy=reg-form]').should('be.visible');

                cy.get('input[name=email]').type(users.validUser.email);
                cy.get('input[name=firstName]').type(users.validUser.firstName);
                cy.get('input[name=lastName]').type(users.validUser.lastName);
                cy.get('select[name=degree]').select(users.validUser.degree);
                cy.get('input[name=degreeYear]').check(users.validUser.degreeYear.toString(), { force: true });
                cy.get('input[name=terms1]').check({ force: true });
                cy.get('input[name=terms3]').check({ force: true });

                cy.get('button[type=submit]').click();

                cy.get('li[class=chakra-toast]').contains('Du må godkjenne vilkårene.');
                cy.get('li[class=chakra-toast]').contains('Vennligst prøv igjen.');
            });
        });
    });
});

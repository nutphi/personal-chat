/// <reference types="cypress" />
import { environment } from 'src/environments/environment.cypress';
import { AppComponent } from './app.component';
import { ChatComponent, ENVIRONMENT } from '@nuttakit/chat';

describe('AppComponent', () => {
  it('can mount Nuttakit chat', () => {
    cy.mount(AppComponent, {
      imports: [ChatComponent],
      providers: [{ provide: ENVIRONMENT, useValue: environment }],
    });
    cy.get('nuttakit-chat').as('chat');
    cy.get('@chat').contains('Chat here to know Nuttakit more');
  });

  context('Send Message', () => {
    beforeEach(() => {
      cy.clock(new Date(2024, 7, 17, 10, 0, 0).getTime());
      cy.mount(AppComponent, {
        imports: [ChatComponent],
        providers: [{ provide: ENVIRONMENT, useValue: environment }],
      });
      cy.get('nuttakit-chat').as('chat');
    });

    it('should get first bot message', () => {
      cy.get(':nth-child(1) > .received').as('bot-section');
      cy.get('@bot-section').find('.text').as('bot-message');
      cy.get('@bot-section')
        .find('.profile-section > .profile-img')
        .as('bot-image');
      cy.get('@bot-section').find('.time').as('bot-sending-time');

      cy.get('@bot-message').contains('Hi! How can I help you today?');
      cy.get('@bot-image').should('have.attr', 'src', 'assets/bot.png');
      cy.get('@bot-sending-time').contains('10:00 AM');
    });

    it('should send my first message with enter', () => {
      cy.clock(new Date(2024, 7, 17, 11, 0, 0).getTime());
      cy.get('.chat-content > form > input[type="text"]').as('user-text-input');
      cy.get('@user-text-input').type(
        'Hello Bot, tell me about Nuttakit.{enter}'
      );
      cy.get('@user-text-input').should('have.value', '');
      cy.get(':nth-child(2) > .sent').as('user-section');
      cy.get('@user-section').find('.text').as('user-message');
      cy.get('@user-section')
        .find('.profile-section > .profile-img')
        .as('user-image');
      cy.get('@user-section').find('.time').as('user-sending-time');

      cy.get('@user-message').contains('Hello Bot, tell me about Nuttakit.');
      cy.get('@user-image').should('have.attr', 'src', 'assets/user.png');
      cy.get('@user-sending-time').contains('10:00 AM');
    });

    it('should get bot response from user first message', () => {
      cy.get('.chat-content > form > input[type="text"]').as('user-text-input');
      cy.get('@user-text-input').type(
        'Hello Bot, tell me about Nuttakit.{enter}'
      );
      cy.get('@user-text-input').should('have.value', '');

      cy.get(':nth-child(3) > .received').as('bot-section');
      cy.get('@bot-section').find('.text').as('bot-message');
      cy.get('@bot-section')
        .find('.profile-section > .profile-img')
        .as('bot-image');
      cy.get('@bot-section').find('.time').as('bot-sending-time');

      cy.get('@bot-message').contains('Nuttakit');
      cy.get('@bot-image').should('have.attr', 'src', 'assets/bot.png');
      cy.get('@bot-sending-time').contains('10:00 AM');
    });
  });

  context('Theme Feature', () => {
    context('morning at 10AM', () => {
      beforeEach(() => {
        cy.clock(new Date(2024, 7, 17, 10, 0, 0).getTime());
        cy.mount(AppComponent, {
          imports: [ChatComponent],
          providers: [{ provide: ENVIRONMENT, useValue: environment }],
        });
        cy.get('nuttakit-chat').as('chat');
      });

      it('can toggle into night mode and light mode back', () => {
        cy.get('html').should(
          'have.css',
          'background-color',
          'rgb(255, 255, 255)'
        );
        cy.get('@chat')
          .contains('Chat here to know Nuttakit more')
          .should('have.css', 'background-color', 'rgb(135, 206, 235)');
        cy.get('@chat')
          .find('.profile-img')
          .should('have.css', 'background-color', 'rgb(135, 206, 235)');
        cy.get('@chat').find('[type="button"] > img').as('toggleMode').click();
        cy.get('html').should('have.css', 'background-color', 'rgb(0, 0, 0)');
        cy.get('@chat')
          .contains('Chat here to know Nuttakit more')
          .should('have.css', 'background-color', 'rgb(235, 164, 135)');
        cy.get('@chat')
          .find('.profile-img')
          .should('have.css', 'background-color', 'rgb(235, 164, 135)');
        cy.getAllLocalStorage().then((result) => {
          const keys = Object.keys(result);
          expect(keys.length).equal(1);
          expect(result[keys[0]]).to.deep.equal({
            darkmode: 'true',
          });
        });
      });
    });

    context('evening at 10PM', () => {
      beforeEach(() => {
        cy.clock(new Date(2024, 7, 17, 22, 0, 0).getTime());
        cy.mount(AppComponent, {
          imports: [ChatComponent],
          providers: [{ provide: ENVIRONMENT, useValue: environment }],
        });
        cy.get('nuttakit-chat').as('chat');
      });

      it('can toggle into night mode and light mode back', () => {
        cy.get('html').should('have.css', 'background-color', 'rgb(0, 0, 0)');
        cy.get('@chat')
          .contains('Chat here to know Nuttakit more')
          .should('have.css', 'background-color', 'rgb(235, 164, 135)');
        cy.get('@chat')
          .find('.profile-img')
          .should('have.css', 'background-color', 'rgb(235, 164, 135)');
        cy.get('@chat').find('[type="button"] > img').as('toggleMode').click();
        cy.get('html').should(
          'have.css',
          'background-color',
          'rgb(255, 255, 255)'
        );
        cy.get('@chat')
          .contains('Chat here to know Nuttakit more')
          .should('have.css', 'background-color', 'rgb(135, 206, 235)');
        cy.get('@chat')
          .find('.profile-img')
          .should('have.css', 'background-color', 'rgb(135, 206, 235)');
      });
    });
  });
});

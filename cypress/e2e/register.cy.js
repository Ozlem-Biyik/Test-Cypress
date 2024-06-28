import { errorMessages } from "../../src/components/Register";

describe('Register Page', () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Error Messages", () => {
    it('Name input throws error for 2 chars', () => {
      // Arrange
      // Act
      cy.get('[data-cy="ad-input"]').type("oz");
      // Assert
      cy.contains(errorMessages.ad);
    });

    it('Surname input throws error for 2 chars', () => {
      // Arrange
      // Act
      cy.get('[data-cy="soyad-input"]').type("bı");
      // Assert
      cy.contains(errorMessages.soyad);
    });

    it('Email input throws error for ozlem@wit.', () => {
      // Arrange
      // Act
      cy.get('[data-cy="email-input"]').type("ozlem@wit.");
      // Assert
      cy.contains(errorMessages.email);
    });

    it('Password input throws error for 1234', () => {
      // Arrange
      // Act
      cy.get('[data-cy="password-input"]').type("1234");
      // Assert
      cy.contains(errorMessages.password);
    });

    it('Button is disabled for unvalidated inputs.', () => {
      // Arrange
      // Act
      cy.get('[data-cy="password-input"]').type("1234");
      // Assert
      cy.get('[data-cy="submit-button"]').should("be.disabled");
    });
  });

  describe("Form inputs validated", () => {
    it('Button enabled for validated inputs', () => {
      // Arrange
      // Act
      cy.get('[data-cy="ad-input"]').type("Ozlem");
      cy.get('[data-cy="soyad-input"]').type("Bıyık");
      cy.get('[data-cy="email-input"]').type("ozlem@wit.com.tr");
      cy.get('[data-cy="password-input"]').type("1234Aa**");
      // Assert
      cy.get('[data-cy="submit-button"]').should("not.be.disabled");
    });

    it('Submits form for validated inputs', () => {
      // Arrange
      // Act
      cy.get('[data-cy="ad-input"]').type("Ozlem");
      cy.get('[data-cy="soyad-input"]').type("Bıyık");
      cy.get('[data-cy="email-input"]').type("ozlem@wit.com.tr");
      cy.get('[data-cy="password-input"]').type("1234Aa**");
      
      // Assert
      cy.get('[data-cy="submit-button"]').should("not.be.disabled");
      cy.get('[data-cy="submit-button"]').click();
    });
  });
});

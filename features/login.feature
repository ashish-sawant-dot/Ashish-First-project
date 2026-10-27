
Feature: Login functionality on Swag Labs application
  Scenario: Successful login with valid credentials
    Given I am on the Swag Labs login page
    When I enter valid username "standard_user" and password "secret_sauce"
    And I click on the login button
    Then I should be navigated to the inventory page

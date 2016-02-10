Feature: Menu Screen
    As a player
    I want to be on the menu screen
    So that I can play the Game

  Scenario: Menu Screen Graphics
    Given I am on the menu Screen
    Then the title should be visible

  Scenario: Statistics
    Given I am on the menu Screen
    When I click on the statistics button
    Then I should see the statistics page

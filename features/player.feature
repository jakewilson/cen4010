Feature: Game Mechanics
  As a player
  I want to interact with the game
  So that I can have fun!

  Scenario: movement
    Given I am the player
    When I press the left or right buttons
    Then I should move left or right

  Scenario: Jump
    Given I am the player
    When I press the 'A' button
    Then I should jump

  Scenario: Rescue Animals
    Given I am the player
    When I touch a poor scared animal
    Then it should become rescued
    And my rescued animals statistics should update

  Scenario: Lose Health
    Given I am the player
    When I touch an enemy
    Then I should lose health
    And the health bar should update

  Scenario: Restore Health
    Given I am the player
    When I touch a health pack
    Then my health should be restored
    And the health bar should update

  Scenario: Vegan shots!
    Given I am the player
    When I press the squeeze banana button
    Then a banana should shoot across the screen

  Scenario: Death
    Given I am the player
    When my health reaches 0
    Then the player should die
    And I should be redirected to the Game over screen

  Scenario: Winning the game
    Given I am the player
    When I defeat the boss
    Then I should see the Game Over screen
    And I should see my score
    And I should see "You Lose!"


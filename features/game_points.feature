Feature: Statistics should be updated
  As a player
  I should gain statistics
  So I can brag about my high score

  Scenario: Rescue animals
    Given I am the player
    When I touch a poor scared animal
    Then I should gain 10 points

  Scenario: Time bonus
    Given I complete the level faster than the average time
    When I go to the game over screen
    Then I should get points based on my recorded time

  Scenario: Collect carrots
    Given I am a player
    When I touch a carrots
    Then I should get 10 points

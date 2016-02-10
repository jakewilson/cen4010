Feature: As the system
  I need apply the game rules
  So that player can have fun!

  Scenario: When the game starts
    Given the player has started the game
    # This includes the enemies, the map, assets etc.
    Then the world should be loaded

  Scenario: Enemies
    Given the player is playing the game
    When the player reaches an enemy spawn location
    Then the enemy should spawn
    And the enemy should go toward the player




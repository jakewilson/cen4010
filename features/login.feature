Feature: As a anonymouser user
  I should be able to login
  So that I can play the game!

  Scenario: Login
    Given that I have proper credentials
    When I login using my credentials
    Then I should see the menu screen

  Scenario: Failed login
    Given that I do not have proper credentials
    When I fail to login 5 times
    Then I should unable to login for 5 minutes


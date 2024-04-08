*** Keywords ***
Wait For Modal To Close
    Wait Until Element Is Not Visible    locator_for_modal    timeout=10

Click And Verify Header Filter
    [Arguments]    ${header_filter_locator}
    Wait Until Element Is Visible    ${header_filter_locator}    timeout=10
    Click Element    ${header_filter_locator}


Wait For Condition return (window.jQuery != null) && (jQuery.active == 0) timeout=15

  
*** Keywords ***
Wait For Text To Change
    [Arguments]    ${locator}    ${expected_text}    ${timeout}
    ${start_time}=    Get Time    epoch
    :FOR    ${current_time}=    ${start_time}    TO    ${start_time}+${timeout}
    \    ${text}=    Get Text    ${locator}
    \    Exit For Loop If    '${text}' == '${expected_text}'
    \    Sleep    1s
    \    ${current_time}=    Get Time    epoch
    \    Run Keyword If    ${current_time} - ${start_time} > ${timeout}    Fail    Timeout waiting for text to change

Wait Until Element Is Not Visible    ${loader_locator}    timeout=15
Wait Until Element Is Visible       ${updated_element_locator}    timeout=15

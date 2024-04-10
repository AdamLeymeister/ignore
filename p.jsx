
*** Keywords ***
Apply Filters And Click Row
    [Documentation]    Applies filters to table rows based on provided criteria and clicks a specified row. Retries applying each filter up to a given count if necessary.
    [Arguments]    &{filters}    ${row_locator}    ${retry_count}=3
    FOR    ${filter_xpath}    IN    &{filters}
        ${filter_value}=    Get From Dictionary    ${filters}    ${filter_xpath}
        ${retry}=    Set Variable    0
        :FOR    ${i}    IN RANGE    1    ${retry_count + 1}
        \    Run Keyword And Ignore Error    Clear Element Text    ${filter_xpath}
        \    Input Text    ${filter_xpath}    ${filter_value}
        \    ${is_correctly_set}=    Run Keyword And Return Status    Wait For Correct Filter Input    ${filter_xpath}    ${filter_value}    1s
        \    Exit For Loop If    ${is_correctly_set}
        \    ${retry}=    Evaluate    ${retry}+1
        \    Log    Retry ${i} for setting filter: ${filter_xpath} to '${filter_value}'
        Run Keyword If    not ${is_correctly_set}    Fail    Filter at '${filter_xpath}' could not be applied correctly after ${retry_count} retries.
    END
    Wait For Row And Click    ${row_locator}    10s

Wait For Correct Filter Input
    [Documentation]    Waits for the filter input element to contain the correct value.
    [Arguments]    ${filter_xpath}    ${expected_value}    ${timeout}
    Wait Until Keyword Succeeds    ${timeout}    0.5s    Element Value Should Be    ${filter_xpath}    ${expected_value}

Wait For Row And Click
    [Documentation]    Waits for a row to become visible within the specified timeout and then clicks it.
    [Arguments]    ${row_locator}    ${timeout}
    Wait Until Element Is Visible    ${row_locator}    timeout=${timeout}
    Click Element    ${row_locator}

______

*** Keywords ***
Scroll To And Wait Until Row Is Updated
    [Arguments]    ${table_xpath}    ${expected_value1}    ${expected_value2}    ${expected_value3}    ${timeout}=30s
    ${end_time}=    Get Time    format=epoch    increment=${timeout}
    ${is_target_row}=    Set Variable    false
    :FOR    ${current_time}    IN RANGE    ${end_time}
    \    ${current_time}=    Get Time    format=epoch
    \    Exit For Loop If    ${current_time} > ${end_time}
    \    ${rows}=    Get Webelements    ${table_xpath}/tr
    \    :FOR    ${row}    IN    @{rows}
    \    \    ${column1_text}=    Get Text    ${row}/td[1]
    \    \    ${column2_text}=    Get Text    ${row}/td[2]
    \    \    ${column3_text}=    Get Text    ${row}/td[3]
    \    \    ${is_target_row}=    Evaluate    '${column1_text}' == '${expected_value1}' and '${column2_text}' == '${expected_value2}' and '${column3_text}' == '${expected_value3}'
    \    \    Exit For Loop If    ${is_target_row}
    \    Exit For Loop If    ${is_target_row}
    \    ${script}=    Set Variable    document.evaluate("${table_xpath}", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.scrollTop += 1000
    \    Execute Javascript    ${script}
    \    Sleep    1s    # Give time for the table to render new rows
    Run Keyword If    not ${is_target_row}    Fail    Row not found within the given timeout



*** Keywords ***
Get Tabulator Header Input Value By XPath
    [Arguments]    ${input_xpath}
    ${input_value}=    Execute JavaScript    return document.evaluate("${input_xpath}", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.value;
    [Return]    ${input_value}

# WhiteHat Security Integration with JupiterOne

## WhiteHat Security + JupiterOne Integration Benefits

- Visualize WhiteHat scans, cves, vulnerabilities, and findings in the
  JupiterOne graph.
- Map WhiteHat findings to a code repo, project, or application in your
  JupiterOne account.
- Monitor WhiteHat cves, findings, and vulnerabilities within the alerts app.
- Monitor changes to WhiteHat scans using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches WhiteHat scans and findings to update the
  graph.
- Write JupiterOne queries to review and monitor updates to the graph.
- Configure alerts to reduce the noise of findings.
- Configure alerts to take action when the JupiterOne graph changes.

## Requirements

- JupiterOne requires an API key to authenticate with WhiteHat.
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In WhiteHat

To obtain the API token for a Whitehat account, sign in to Sentinel. Click the
"My Profile" button in the top right and then "API Key". Enter the account
password and copy the displayed API Key.

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **WhiteHat** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this WhiteHat
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **API Key** used to authenticate with WhiteHat.

4. Click **Create Configuration** once all values are provided.

## How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **WhiteHat** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

<!-- {J1_DOCUMENTATION_MARKER_START} -->
<!--
********************************************************************************
NOTE: ALL OF THE FOLLOWING DOCUMENTATION IS GENERATED USING THE
"j1-integration document" COMMAND. DO NOT EDIT BY HAND! PLEASE SEE THE DEVELOPER
DOCUMENTATION FOR USAGE INFORMATION:

https://github.com/JupiterOne/sdk/blob/main/docs/integrations/development.md
********************************************************************************
-->

## Data Model

### Entities

The following entities are created:

| Resources                          | Entity `_type`         | Entity `_class`       |
| ---------------------------------- | ---------------------- | --------------------- |
| Account                            | `whitehat_account`     | `Account`             |
| Appliance                          | `whitehat_appliance`   | `Gateway`             |
| Application and Mobile Application | `whitehat_application` | `Application`         |
| Assessment                         | `whitehat_assessment`  | `Assessment`          |
| Asset                              | `whitehat_asset`       | `Application`         |
| Codebase                           | `whitehat_codebase`    | `CodeRepo`            |
| Finding                            | `whitehat_finding`     | `Finding`             |
| Group                              | `whitehat_group`       | `UserGroup`           |
| Role                               | `whitehat_role`        | `AccessRole`          |
| Scan Type                          | `whitehat_scan`        | `Service`             |
| Site                               | `web_app_domain`       | `Application`, `Host` |
| User                               | `whitehat_user`        | `User`                |

### Relationships

The following relationships are created:

| Source Entity `_type`  | Relationship `_class` | Target Entity `_type`  |
| ---------------------- | --------------------- | ---------------------- |
| `web_app_domain`       | **HAS**               | `whitehat_assessment`  |
| `web_app_domain`       | **HAS**               | `whitehat_finding`     |
| `whitehat_account`     | **HAS**               | `whitehat_appliance`   |
| `whitehat_account`     | **HAS**               | `whitehat_asset`       |
| `whitehat_account`     | **HAS**               | `whitehat_group`       |
| `whitehat_account`     | **HAS**               | `whitehat_scan`        |
| `whitehat_account`     | **HAS**               | `whitehat_user`        |
| `whitehat_application` | **HAS**               | `whitehat_assessment`  |
| `whitehat_application` | **HAS**               | `whitehat_codebase`    |
| `whitehat_application` | **HAS**               | `whitehat_finding`     |
| `whitehat_assessment`  | **IDENTIFIED**        | `whitehat_finding`     |
| `whitehat_asset`       | **HAS**               | `whitehat_application` |
| `whitehat_asset`       | **HAS**               | `web_app_domain`       |
| `whitehat_group`       | **HAS**               | `whitehat_user`        |
| `whitehat_scan`        | **PERFORMED**         | `whitehat_assessment`  |
| `whitehat_user`        | **ASSIGNED**          | `whitehat_role`        |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->

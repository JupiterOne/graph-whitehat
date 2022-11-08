# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 2.0.0 - 2022-11-01

### Added

The following entities are **now** created:

| Resources                          | Entity `_type`         | Entity `_class`       |
| ---------------------------------- | ---------------------- | --------------------- |
| Account                            | `whitehat_account`     | `Account`             |
| Appliance                          | `whitehat_appliance`   | `Gateway`             |
| Application and Mobile Application | `whitehat_application` | `Application`         |
| Assessment                         | `whitehat_assessment`  | `Assessment`          |
| Asset                              | `whitehat_asset`       | `Application`         |
| Codebase                           | `whitehat_codebase`    | `CodeRepo`            |
| Component                          | `whitehat_component`   | `CodeModule`          |
| Endpoint                           | `web_app_endpoint`     | `ApplicationEndpoint` |
| Finding                            | `whitehat_finding`     | `Finding`             |
| Group                              | `whitehat_group`       | `UserGroup`           |
| Role                               | `whitehat_role`        | `AccessRole`          |
| Scan Type                          | `whitehat_scan`        | `Service`             |
| Site                               | `web_app_domain`       | `Application`, `Host` |
| User                               | `whitehat_user`        | `User`                |

The following relationships are **now** created:

| Source Entity `_type`  | Relationship `_class` | Target Entity `_type`  |
| ---------------------- | --------------------- | ---------------------- |
| `web_app_domain`       | **HAS**               | `web_app_endpoint`     |
| `web_app_domain`       | **HAS**               | `whitehat_assessment`  |
| `web_app_domain`       | **HAS**               | `whitehat_finding`     |
| `whitehat_account`     | **HAS**               | `whitehat_appliance`   |
| `whitehat_account`     | **HAS**               | `whitehat_asset`       |
| `whitehat_account`     | **HAS**               | `whitehat_group`       |
| `whitehat_account`     | **HAS**               | `whitehat_scan`        |
| `whitehat_account`     | **HAS**               | `whitehat_user`        |
| `whitehat_application` | **HAS**               | `whitehat_assessment`  |
| `whitehat_application` | **HAS**               | `whitehat_codebase`    |
| `whitehat_application` | **HAS**               | `whitehat_component`   |
| `whitehat_application` | **HAS**               | `whitehat_finding`     |
| `whitehat_assessment`  | **IDENTIFIED**        | `whitehat_finding`     |
| `whitehat_asset`       | **HAS**               | `whitehat_application` |
| `whitehat_asset`       | **HAS**               | `web_app_domain`       |
| `whitehat_group`       | **HAS**               | `whitehat_user`        |
| `whitehat_scan`        | **PERFORMED**         | `whitehat_assessment`  |
| `whitehat_user`        | **ASSIGNED**          | `whitehat_role`        |

The following mapped relationships are created:

| Source Entity `_type` | Relationship `_class` | Target Entity `_type` | Direction |
| --------------------- | --------------------- | --------------------- | --------- |
| `whitehat_component`  | **HAS**               | `*cve*`               | FORWARD   |
| `whitehat_finding`    | **EXPLOITS**          | `*cwe*`               | FORWARD   |

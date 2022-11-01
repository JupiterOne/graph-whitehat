import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const scanSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: https://sentinel.whitehatsec.com/api/sourceApplications/${appId}/scans
     * PATTERN: Fetch Entities
     */
    id: 'fetch-application-assessments',
    name: 'Fetch Application Assessments',
    entities: [
      {
        resourceName: 'Assessment',
        _type: 'whitehat_assessment',
        _class: ['Assessment'],
      },
    ],
    relationships: [
      {
        _type: 'whitehat_scan_performed_assessment',
        sourceType: 'whitehat_scan',
        _class: RelationshipClass.PERFORMED,
        targetType: 'whitehat_assessment',
      },
      {
        _type: 'whitehat_application_has_assessment',
        sourceType: 'whitehat_application',
        _class: RelationshipClass.HAS,
        targetType: 'whitehat_assessment',
      },
    ],
    dependsOn: ['fetch-applications', 'fetch-service'],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: https://sentinel.whitehatsec.com/api/site/${siteId}/last_completed_scans
     * PATTERN: Fetch Entities
     */
    id: 'fetch-site-assessments',
    name: 'Fetch Site Assessments',
    entities: [
      {
        resourceName: 'Assessment',
        _type: 'whitehat_assessment',
        _class: ['Assessment'],
      },
    ],
    relationships: [
      {
        _type: 'whitehat_scan_performed_assessment',
        sourceType: 'whitehat_scan',
        _class: RelationshipClass.PERFORMED,
        targetType: 'whitehat_assessment',
      },
      {
        _type: 'web_app_domain_has_whitehat_assessment',
        sourceType: 'web_app_domain',
        _class: RelationshipClass.HAS,
        targetType: 'whitehat_assessment',
      },
    ],
    dependsOn: ['fetch-sites', 'fetch-service'],
    implemented: true,
  },
];

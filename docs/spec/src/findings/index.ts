import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const findingSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: Singleton
     */
    id: 'fetch-findings',
    name: 'Fetch Findings',
    entities: [
      {
        resourceName: 'Finding',
        _type: 'whitehat_finding',
        _class: ['Finding'],
      },
    ],
    relationships: [
      {
        _type: 'whitehat_application_has_finding',
        sourceType: 'whitehat_application',
        _class: RelationshipClass.HAS,
        targetType: 'whitehat_finding',
      },
      {
        _type: 'web_app_domain_has_whitehat_finding',
        sourceType: 'web_app_domain',
        _class: RelationshipClass.HAS,
        targetType: 'whitehat_finding',
      },
    ],
    dependsOn: ['fetch-applications', 'fetch-sites'],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: Singleton
     */
    id: 'build-finding-scan-relationship',
    name: 'Build Findings and Scan Relationship',
    entities: [],
    relationships: [
      {
        _type: 'whitehat_assessment_identified_finding',
        sourceType: 'whitehat_assessment',
        _class: RelationshipClass.IDENTIFIED,
        targetType: 'whitehat_finding',
      },
    ],
    dependsOn: [
      'fetch-findings',
      'fetch-application-assessments',
      'fetch-site-assessments',
    ],
    implemented: true,
  },
];

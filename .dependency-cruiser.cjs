module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      comment: 'Không cho phụ thuộc vòng',
      severity: 'error',
      from: {},
      to: { circular: true }
    },
    {
      name: 'domain-doc-lap',
      comment: 'DOMAIN không được phụ thuộc tầng nào',
      severity: 'error',
      from: { path: 'packages/[^/]+/src/domain' },
      to:   { path: 'packages/[^/]+/src/(application|infra|presentation|bootstrap)' }
    },
    {
      name: 'application-chi-domain',
      comment: 'APPLICATION chỉ được đi tới DOMAIN',
      severity: 'error',
      from: { path: 'packages/[^/]+/src/application' },
      to:   { path: 'packages/[^/]+/src/(infra|presentation|bootstrap)' }
    },
    {
      name: 'infra-chi-domain',
      comment: 'INFRA chỉ được đi tới DOMAIN',
      severity: 'error',
      from: { path: 'packages/[^/]+/src/infra' },
      to:   { path: 'packages/[^/]+/src/(application|presentation|bootstrap)' }
    },
    {
      name: 'presentation-khong-dung-infra',
      comment: 'PRESENTATION không được chạm INFRA/bootstrap (chỉ qua APPLICATION)',
      severity: 'error',
      from: { path: 'packages/[^/]+/src/presentation' },
      to:   { path: 'packages/[^/]+/src/(infra|bootstrap)' }
    }
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsPreCompilationDeps: true
  }
};

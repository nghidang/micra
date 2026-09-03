module.exports = {
  forbidden: [
    // --- Chung ---
    {
      name: 'no-circular',
      comment: 'Không cho phụ thuộc vòng',
      severity: 'error',
      from: {},
      to: { circular: true },
    },
    {
      name: 'no-orphans',
      comment: 'File mồ côi: không ai import VÀ không import ai',
      severity: 'error',
      from: {
        orphan: true,
        pathNot: [
          '\\.d\\.ts$',
          '(^|/)(vite|vitest)\\.config\\.[jt]s$',
          '\\.eslintrc\\.cjs$',
          '(^|/)eslint-config/',
          '(^|/)index\\.ts$',
        ],
      },
      to: {},
    },
    {
      name: 'no-dead-code',
      comment: 'File không reach được từ index.ts (dead code)',
      severity: 'error',
      from: { path: 'packages/mfe-users/src/index\\.ts$' },
      to: {
        path: 'packages/mfe-users/src',
        pathNot: [
          '\\.(test|spec)\\.tsx?$',
          'packages/mfe-users/src/infra/adapters/in-memory-user\\.adapter\\.ts$',
        ],
        reachable: false,
      },
    },

    // --- Sơ đồ: hướng phụ thuộc 4 tầng ---
    {
      name: 'domain-doc-lap',
      comment: 'Sơ đồ: DOMAIN không có mũi tên đi ra',
      severity: 'error',
      from: { path: 'packages/[^/]+/src/domain' },
      to: { path: 'packages/[^/]+/src/(application|infra|presentation|bootstrap)' },
    },
    {
      name: 'domain-thuan-ts',
      comment:
        'Clean Arch: DOMAIN (dtos/enums/rules/errors...) thuần TS, không import thư viện ngoài (react, @ionic, zustand...)',
      severity: 'error',
      from: { path: 'packages/[^/]+/src/domain' },
      to: { dependencyTypes: ['npm', 'npm-dev', 'npm-peer', 'npm-optional'] },
    },
    {
      name: 'application-chi-domain',
      comment:
        'Luồng 1,2,4: APPLICATION chỉ đi tới DOMAIN (Usecase phụ thuộc Interface, không giữ Adapter)',
      severity: 'error',
      from: { path: 'packages/[^/]+/src/application' },
      to: { path: 'packages/[^/]+/src/(infra|presentation|bootstrap)' },
    },
    {
      name: 'application-khong-ui',
      comment:
        'APPLICATION framework-free: không @ionic/react/react-dom/@tanstack (UI & data-fetching thuộc PRESENTATION)',
      severity: 'error',
      from: { path: 'packages/[^/]+/src/application' },
      to: { path: 'node_modules/(@ionic|react|react-dom|@tanstack/react-query)/' },
    },
    {
      name: 'application-zustand-chi-ui-store',
      comment:
        'Zustand chỉ ở application/stores/ui (client/UI-state). Server-state dùng TanStack Query — KHÔNG tạo zustand data store.',
      severity: 'error',
      from: {
        path: 'packages/[^/]+/src/application',
        pathNot: 'packages/[^/]+/src/application/stores/ui',
      },
      to: { path: 'node_modules/zustand' },
    },
    {
      name: 'infra-chi-domain',
      comment: 'Sơ đồ: INFRA chỉ đi tới DOMAIN (map DTO/Error Format của Domain)',
      severity: 'error',
      from: { path: 'packages/[^/]+/src/infra' },
      to: { path: 'packages/[^/]+/src/(application|presentation|bootstrap)' },
    },
    {
      name: 'infra-khong-ui',
      comment: 'Luồng 6: INFRA là adapter/interceptor headless, không dính react/@ionic',
      severity: 'error',
      from: { path: 'packages/[^/]+/src/infra' },
      to: { path: 'node_modules/(react|react-dom|@ionic)/' },
    },
    {
      name: 'infra-service-khong-nguoc',
      comment: 'services là lớp HTTP thuần; chỉ adapters → services, không ngược lại',
      severity: 'error',
      from: { path: 'packages/mfe-users/src/infra/services' },
      to: { path: 'packages/mfe-users/src/infra/adapters' },
    },
    {
      name: 'presentation-khong-dung-infra',
      comment: 'Luồng 1,4 (DIP): PRESENTATION chỉ qua APPLICATION, không chạm INFRA/bootstrap',
      severity: 'error',
      from: { path: 'packages/[^/]+/src/presentation' },
      to: { path: 'packages/[^/]+/src/(infra|bootstrap)' },
    },

    // --- Luồng 5: phân cấp UI chảy xuống (Page → Template → Organisms) ---
    {
      name: 'pres-organisms-khong-nguoc',
      comment: 'Luồng 5: organisms không được import pages/templates (chỉ chảy xuống)',
      severity: 'error',
      from: { path: 'packages/[^/]+/src/presentation/organisms' },
      to: { path: 'packages/[^/]+/src/presentation/(pages|templates)' },
    },
    {
      name: 'pres-templates-khong-nguoc',
      comment: 'Luồng 5: templates không được import pages',
      severity: 'error',
      from: { path: 'packages/[^/]+/src/presentation/templates' },
      to: { path: 'packages/[^/]+/src/presentation/pages' },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsPreCompilationDeps: true,
  },
};

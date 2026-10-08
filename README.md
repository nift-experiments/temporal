# Nift `temporal` — Temporal Docs migration

Completed T0–T9 experiment. This repository maintains **authored Markdown/MDX/frontmatter and structured references** and retained React islands. The upstream implementation is Temporal Docusaurus; the other Nift source model is a separate repository.

- [Final comparison, parity and maintenance judgment](investigation/FINAL-REPORT.md)
- [Pinned baseline](investigation/BASELINE.md), [parity contract](investigation/PARITY-CONTRACT.md)
- [Initial profiling](investigation/T7-INITIAL-PROFILING.md), [optimization/revalidation](investigation/T8-OPTIMIZATION.md)
- [Final measurements and evidence](investigation/t9/t9-final-summary.json)
- [Migration-init review](investigation/MIGRATION-INIT-REVIEW.md)
- [Method](MIGRATION.md), [handover](HANDOVER.md), [status](investigation/STATUS.md)

## Build

Use Node 24.x (tested 24.21.0), Yarn 1.22.22 and Nift 4.9.0 on PATH. The lockfile is frozen.

```sh
yarn install --frozen-lockfile --ignore-scripts --non-interactive
yarn build
# Independent complete recomputation:
yarn build:force
```

Output is `public/`. The normal command includes transient preparation, retained component bundles, static assets, companion products and Nift composition. Bare `nift build` only composes prepared inputs. Normal builds publish maintained OG bytes; they do not regenerate every card. Explicit selective maintenance: `node tools/refresh-og.cjs --route /PATH`.

Authored content stays in `docs/`; maintained cookbook inputs are in `references/cookbook-source`, converted locally into `ai-cookbook`. Sidebars/frontmatter and structured references are authoritative. Markdown downloads/LLM views are derived. Updating the pinned cookbook snapshot is explicit maintenance, not a normal-build network clone.

Stage caches are transient and content-verified. Force bypasses them. Incremental/source/lifecycle/corruption tests and controlled browser evidence are committed by checkpoint. Diagnostic evidence scripts refer to the preserved sibling baseline/reference workspace; normal public-clone builds do not. Remote browser parity used local fixtures; live Algolia/backends and hosted deployment were not exercised.

No Nift core changes or Temporal Labs publication are part of this experiment. Future adapter, tooling and profiling opportunities do not reopen the accepted result.

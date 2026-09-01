export function Disclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <p className={compact ? "text-xs leading-relaxed text-subtle" : "text-sm leading-relaxed text-muted"}>
      Hypothesis atlas, not a confirmation. Restricted military, DOE, Navy, and tribal land is
      illegal to enter. Observe from public ground only. Missing-person figures are published rates
      and clusters — they are a locator layer, not a charge sheet.
    </p>
  );
}

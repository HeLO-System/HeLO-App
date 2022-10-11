const checkFF = (ff?: string): boolean => ff === "true";

export const appConfig = {
  reportMatchAllowOffensive: checkFF(
    process.env.NEXT_PUBLIC_REPORT_MATCH_ALLOW_OFFENSIVE
  ),
  reportMatchAlwaysAllowOther: checkFF(
    process.env.NEXT_PUBLIC_FF_REPORT_MATCH_ALLOW_OFFENSIVE
  ),
};

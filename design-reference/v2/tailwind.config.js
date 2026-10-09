/** Next Call In (NCI) — design-reference v2 tokens.
 *  Bound to Joe’s supplied October 7 artwork:
 *  teal #397F8B / #306D78, alert red #DF0000, slate #254763, surface #F7F7F7,
 *  headings in Play, body in Roboto, Roboto Slab for statements and figures.
 */
module.exports = {
  content: ["./*.html", "./partials/*.html", "./scripts/*.js"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem", xl: "2.5rem" } },
    extend: {
      colors: {
        canvas: "#FFFFFF",
        surface: "#F7F7F7",
        "surface-subtle": "#F1F5F3",
        ink: "#1E2622",
        "muted-ink": "#5C6660",
        border: "#E1E7E4",
        brand: { DEFAULT: "#397F8B", hover: "#306D78", deep: "#254763", tint: "#E5F3F4", subtle: "#F2F8F9", ink: "#254763" },
        "on-brand": "#FFFFFF",
        slate: { DEFAULT: "#254763", deep: "#1C354B" },
        alert: { DEFAULT: "#DF0000", hover: "#C40000" },
        focus: "#1D6FE0",
        success: "#1F8A4C",
        warning: "#B7791F",
        error: "#C8102E",
      },
      fontFamily: {
        display: ["Play", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Roboto", "ui-sans-serif", "system-ui", "sans-serif"],
        slab: ["'Roboto Slab'", "Georgia", "serif"],
      },
      maxWidth: { site: "1200px" },
      boxShadow: {
        card: "0 1px 2px rgba(20,40,30,0.06), 0 8px 24px -12px rgba(20,40,30,0.18)",
        lift: "0 12px 32px -12px rgba(3,136,85,0.35)",
      },
      borderRadius: { xl2: "1.25rem" },
    },
  },
  plugins: [],
};

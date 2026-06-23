import { describe, expect, it } from "vitest";
import { normalizeTeamName } from "./normalize";

describe("normalizeTeamName", () => {
  it("resuelve acentos y aliases en distintos idiomas", () => {
    expect(normalizeTeamName("  MÉXICO. ")).toBe("mexico");
    expect(normalizeTeamName("Korea Republic")).toBe("south_korea");
    expect(normalizeTeamName("Côte d'Ivoire")).toBe("ivory_coast");
    expect(normalizeTeamName("Türkiye")).toBe("turkey");
  });
});

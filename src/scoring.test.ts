import { describe, expect, it } from "vitest";
import { scorePicks } from "./scoring";

describe("scorePicks", () => {
  it("suma una coincidencia por selección acertada", () => {
    expect(scorePicks([
      { team: "México", qualified: true },
      { team: "Canadá", qualified: false },
    ], ["México"])).toBe(2);
  });
});


---
route: "/guides/system-requirements/"
seoTitle: "ARC Raiders PC Requirements Guide | Win 10/11 64-bit"
metaDescription: "Windows PC requirements checklist for ARC Raiders modules, with gameplay stills showing HUD load. Confirm CPU, RAM, and GPU before purchase."
schemaTypes: ["WebPage", "Article"]
layout: "article"
articlePublished: "2026-01-01"
heroImage:
  src: "/images/showcase/arc-gameplay-outdoor.webp"
  alt: "Outdoor gameplay HUD used as requirements guide hero"
ogImage: "/images/showcase/arc-gameplay-outdoor-640.webp"
---

# System requirements

Use this checklist before you open checkout. Vendor pages list the binding CPU, GPU, and driver minimums; we pair each row with outdoor and menu stills so you know how dense overlays look on a typical mid-range PC.

![Outdoor session with HUD elements visible](/images/showcase/arc-gameplay-outdoor.webp)

## Hardware baseline

| Area | What to verify before install |
|------|-------------------------------|
| OS | 64-bit Windows 10 (22H2+) or Windows 11 — note your build in support tickets |
| CPU | Modern quad-core or better; vendor docs name exact models |
| RAM | 16 GB minimum; close heavy browser tabs before launching overlays |
| GPU | DirectX 11 class GPU that already runs ARC Raiders at your target resolution |
| Storage | Fast SSD with space for the client plus vendor loader |

If the base game stutters before you install anything, fix that first. ESP layers, skeleton draws, and menu tabs add draw calls on top of normal gameplay.

## Display and input

Run the client in borderless or fullscreen borderless when overlays must stay aligned with the camera. Exclusive fullscreen can break overlay positioning until you restart.

Set Windows scaling to 100% when possible while testing. Mixed DPI (125% on a laptop panel, 100% on an external monitor) can shift HUD anchors until you match the vendor troubleshooting steps.

Disable Game Bar capture overlays during first login. Third-party recorders that inject their own HUD can fight for the same screen space as loot filters.

## Security software

Add the vendor folder to Windows Defender exclusions only after you verify the download hash on the official checkout page. Blind exclusions are risky; follow the receipt-linked guide instead of random mirrors.

Close kernel-level anti-cheat tools from other titles before testing ARC Raiders modules. Some utilities stay resident after you exit those games and can block injection until a reboot.

## Proof from our still set

Outdoor screenshots show player markers and distance readouts layered on terrain. If your GPU struggles with foliage pop-in, expect ESP boxes to flicker when frames dip below your usual average.

The inventory still documents menu density. Inventory and loot tabs should open without halving FPS; if they do, lower in-game graphics before enabling container highlights.

## Plans and checkout

Homepage pricing previews show **$35 monthly** and **$150 lifetime** for the core ARC Raiders bundle. Those figures help you budget RAM and GPU upgrades; the vendor page shows tax, coupons, and the final USD charge.

Optional add-ons such as Cloud DMA or HWID utilities have their own requirement rows. Read the [Cloud DMA setup article](/guides/cloud-dma-setup/) only when your cart includes that line item.

## FAQ-style checks

**Will overlays run on a laptop GPU?** Many shoppers use RTX 3060 Mobile or RX 6700M class chips. Match vendor minimums and test in a private lobby before you enable loot filters in a raid.

**Do I need a second monitor?** Not for standard ESP, but some DMA workflows documented separately expect passthrough hardware. That path is optional and not required for the screenshots on this domain.

**Where do refunds live?** Billing disputes go through the vendor named on your receipt. This site publishes guides and affiliate links; it does not hold license keys.

## Next steps

Compare module depth on the [ESP stills article](/arc-raiders-esp/) and [aim smoothing field guide](/arc-raiders-aimbot/). When hardware passes this list, continue through the [affiliate checkout bridge](/go/) so pricing and key delivery stay on the official cart.
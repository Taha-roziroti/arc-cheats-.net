---
route: "/guides/cloud-dma-setup/"
seoTitle: "Arc Raiders Cloud DMA Setup Guide | Windows PC Steps"
metaDescription: "Cloud DMA preparation guide with indoor breach screenshots. Hyper-V and firmware steps belong here after vendor documentation is wired in."
schemaTypes: ["WebPage", "Article"]
layout: "article"
checkout: "cloud-dma"
articlePublished: "2026-01-01"
heroImage:
  src: "/images/showcase/arc-gameplay-indoor.webp"
  alt: "Indoor breach screenshot for setup guide"
ogImage: "/images/showcase/arc-gameplay-indoor-640.webp"
---

# Cloud DMA setup on Windows

Cloud DMA is an optional add-on for shoppers who already passed the [ARC Raiders PC requirements checklist](/guides/system-requirements/). This article explains preparation order, indoor validation, and when to pause overlays so firmware and hypervisor steps finish cleanly.

![Indoor breach with weapon light cone](/images/showcase/arc-gameplay-indoor.webp)

## Who needs this guide

Buy the DMA line only when your cart or vendor email lists Cloud DMA explicitly. Standard ESP and aim modules on the homepage do not require passthrough hardware.

If you are comparing detection risk, read the [account versus hardware ban primer](/arc-raiders-account-vs-hardware-ban/) before you invest in firmware or secondary PCs.

## Preparation order

1. Finish Windows updates and note your build number for support.
2. Confirm BIOS virtualization settings match the vendor PDF — names differ between Intel VT-x and AMD-V.
3. Enable or disable Hyper-V per the vendor matrix; conflicting hypervisors cause the indoor smoke test to fail before ARC Raiders launches.
4. Install only the signed drivers linked from your receipt; ignore repacked loaders from forums.
5. Reboot after every driver swap so orphaned kernel hooks do not stack.

Keep a paper log of each step. Support teams ask for timestamps when indoor ESP fails after a firmware flash.

## Indoor validation

Use breach maps with tight corridors to confirm radar still aligns when muzzle flashes bloom. Our indoor still shows weapon light cones washing walls — markers should stay glued to targets through that lighting change.

![Player ESP in confined space](/images/showcase/arc-esp-indoor-radar.webp)

Run a five-minute private session without recording software. If frames stay within five percent of your baseline gameplay average, re-enable loot filters one category at a time.

When radar drifts after a driver update, revert to the last known-good vendor package before you tweak FOV or smoothing on the [corridor aim smoothing guide](/arc-raiders-aimbot/) page.

## Hyper-V and firmware notes

Vendor documentation may ask you to disable Core Isolation or Memory Integrity temporarily. Record previous values so you can restore Windows security features after validation.

DMA firmware updates can require a cold boot twice. Do not queue game patches in the background while flash utilities run; interrupted writes brick passthrough until you reflash from recovery.

If your motherboard hides VT-d or IOMMU groups behind OEM names, search the vendor Discord or ticket portal for your exact board SKU before guessing in BIOS.

## Offers and billing

DMA add-ons bill separately from the $35 / $150 core bundle shown on the homepage hero. Checkout may show a subscription for cloud relay time plus hardware deposit language.

Affiliate links on this domain do not change those totals; they only attribute the sale. Read the [affiliate earnings disclosure](/affiliate-disclosure/) if you want to know how we earn from your cart.

## Support routing

Email the address on your receipt with: motherboard model, BIOS version, hypervisor state, and a screenshot of the indoor test above. Point support to this article only as context — they follow vendor scripts.

For non-DMA license issues, use the [support channel list](/support/) instead of mixing DMA logs with standard key resends.

## FAQ

**Can I run DMA and standard overlays together?** Vendor matrices differ. Follow the PDF tied to your SKU; do not stack experimental loaders.

**Does DMA remove ban risk?** No product eliminates enforcement. Hardware bans are discussed honestly on the ban guide; DMA does not replace reading that page.

**Should I buy DMA before core ESP?** Most shoppers validate standard modules first, then add DMA if they still need passthrough. Skipping straight to DMA raises cost and setup time.

When copy and screenshots on this domain are updated after a vendor release, start again from step one on this checklist before you raid with overlays enabled.

Return to the [site homepage](/) for current plan figures and module stills.
# Videos Folder

Place all your video files in this directory.

## Required Video Files

Based on your project configuration, you need the following video files:

### Hero Section Videos (src/components/Hero.tsx)
1. `run-shot-on-iphone.mp4` - RUN project video
2. `across-web3-defi-night.mp4` - Across Web3 DeFi Night video
3. `finance-documentary.mp4` - Finance documentary video
4. `reliq-launch-campaign.mp4` - Reliq launch campaign video
5. `devlearn-community-pitch.mp4` - Devlearn community pitch video
6. `rangrezz-alfaaz-promotional.mp4` - Rangrezz-Alfaaz promotional video
7. `across-web3-infotainment.mp4` - Across Web3 infotainment video
8. `agyaat-khat-intro.mp4` - Agyaat Khat intro video
9. `saas-vfx-ai-intro.mp4` - SaaS VFX AI intro video
10. `saas-vfx-ai-explainer.mp4` - SaaS VFX AI explainer video
11. `thanksgiving-welcoming.mp4` - Thanksgiving welcoming video
12. `agyaat-khat-short-series.mp4` - Agyaat Khat short series video

### Project Detail Videos (src/data/projects.ts)
1. `across-protocol-motion-design.mp4` - Across Protocol US project
2. `agyaat-aadarsh-film-editing.mp4` - Agyaat Aadarsh project
3. `vfx-ai-creative-direction.mp4` - VFX AI project
4. `short-form-reels.mp4` - Short Form Reels project

## Video Optimization Tips

For best performance on Azure VM:
- Use compressed MP4 format (H.264 codec)
- Recommended resolution: 1920x1080 or lower
- Target bitrate: 2-5 Mbps for web streaming
- Use tools like HandBrake or FFmpeg for compression

## FFmpeg Compression Example

```bash
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 23 -c:a aac -b:a 128k output.mp4
```

## Naming Convention

Please name your files exactly as specified above, or update the paths in:
- `src/components/Hero.tsx`
- `src/data/projects.ts`

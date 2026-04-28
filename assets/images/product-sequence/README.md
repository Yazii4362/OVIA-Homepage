# OVIA Product Image Sequence Guide

## 📋 Overview
애플 스타일의 제품 회전 인터랙션을 위한 이미지 시퀀스 생성 가이드

## 🎯 Specifications

### Frame Count
- **Desktop**: 60 frames (360° / 6° = 60)
- **Mobile**: 30 frames (360° / 12° = 30)

### Image Format
- **Format**: WebP (최적 압축)
- **Size**: 200-400KB per frame
- **Dimensions**: 1920x1080px (16:9)
- **Quality**: 85-90%

### File Naming
```
frame_000.webp
frame_001.webp
frame_002.webp
...
frame_059.webp
```

## 🤖 AI Generation Prompt

### Base Prompt (고정)
```
3D premium pharmaceutical glass vial, minimalist label "OV-201", 
centered, perfectly aligned, identical lighting, identical background, 
soft studio lighting, realistic glass texture, clean white reflective surface, 
ultra realistic, no text variation, no camera shift, same object, 
same position, no variation except rotation
```

### Frame-specific Addition
각 프레임마다 추가:
```
rotation angle: 0 degrees    (frame_000)
rotation angle: 6 degrees    (frame_001)
rotation angle: 12 degrees   (frame_002)
...
rotation angle: 354 degrees  (frame_059)
```

### Complete Prompt Example (Frame 0)
```
3D premium pharmaceutical glass vial, minimalist label "OV-201", 
centered, perfectly aligned, identical lighting, identical background, 
soft studio lighting, realistic glass texture, clean white reflective surface, 
ultra realistic, no text variation, no camera shift, same object, 
same position, no variation except rotation, rotation angle: 0 degrees
```

## 🛠️ Production Pipeline

### Option 1: AI Generation (Midjourney/DALL-E)
1. Generate 10-20 key frames using AI
2. Use Photoshop to align and normalize
3. Use frame interpolation (After Effects / Topaz Video AI)
4. Export as WebP sequence

### Option 2: 3D Rendering (Blender/Cinema 4D)
1. Create 3D model of vial
2. Set up camera and lighting
3. Render 60 frames with 6° rotation increments
4. Post-process and export as WebP

### Option 3: Real Photography + Turntable
1. Physical product on motorized turntable
2. Capture 60 photos at 6° intervals
3. Post-process for consistency
4. Export as WebP

## ⚠️ Critical Requirements

### Consistency Checklist
- [ ] Same lighting across all frames
- [ ] Same background color
- [ ] Same object position (centered)
- [ ] Same camera distance
- [ ] No text/label variation
- [ ] Smooth rotation increments

### Quality Control
- [ ] No frame jumps or jitters
- [ ] Consistent shadows
- [ ] No color shifts
- [ ] Proper alpha channel (if needed)
- [ ] Optimized file size

## 🎨 Post-Processing

### Photoshop Batch Actions
1. Auto-align layers
2. Color correction
3. Resize to 1920x1080
4. Export as WebP

### After Effects
1. Import sequence
2. Apply stabilization
3. Color grading
4. Frame interpolation (if needed)
5. Export as WebP sequence

## 📊 Performance Optimization

### Image Optimization
```bash
# Convert PNG to WebP
cwebp -q 85 frame_000.png -o frame_000.webp

# Batch convert
for i in {0..59}; do
  cwebp -q 85 frame_$(printf "%03d" $i).png -o frame_$(printf "%03d" $i).webp
done
```

### Lazy Loading Strategy
- Preload first 10-20 frames
- Load remaining frames on scroll
- Use Intersection Observer API

## 🔍 Testing

### Browser Testing
- Chrome (desktop/mobile)
- Safari (iOS)
- Firefox
- Edge

### Performance Metrics
- First frame load: < 500ms
- Smooth 60fps scrolling
- Total sequence size: < 20MB

## 📝 Notes

### Common Issues
1. **Frame inconsistency**: Use AI with same seed/prompt
2. **Lighting variation**: Post-process with batch color correction
3. **Position drift**: Use Photoshop auto-align
4. **Large file size**: Optimize WebP quality (80-85%)

### Alternative Approaches
- Use video (MP4/WebM) instead of image sequence
- Use 3D model with Three.js (real-time rendering)
- Use sprite sheet (single image with all frames)

## 🚀 Quick Start

### Placeholder Images
현재 폴더에 placeholder 이미지를 생성하려면:

```bash
# Create 60 placeholder frames
for i in {0..59}; do
  convert -size 1920x1080 xc:white \
    -gravity center \
    -pointsize 72 \
    -annotate +0+0 "Frame $i" \
    frame_$(printf "%03d" $i).png
done
```

### Test Implementation
1. 이미지 시퀀스를 이 폴더에 배치
2. index.html 열기
3. 제품 섹션까지 스크롤
4. 부드러운 회전 확인

## 📚 Resources

- [GSAP ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [WebP Converter](https://developers.google.com/speed/webp)
- [Topaz Video AI](https://www.topazlabs.com/video-ai) (frame interpolation)
- [After Effects Frame Interpolation](https://helpx.adobe.com/after-effects/using/frame-rate.html)

---

**Last Updated**: 2026-04-28
**Version**: 1.0

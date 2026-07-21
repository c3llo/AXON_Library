window.REMOTION_CATALOG = [
  {
    "id": 1,
    "slug": "position-path",
    "title": "위치·경로 애니메이션",
    "english": "Position & Path Motion",
    "description": "직선 이동부터 곡선 경로, 중력, 관성, 흔들림, 경로 추적까지 위치 값을 시간에 따라 제어합니다.",
    "keywords": [
      "translate",
      "offset-path",
      "orbit",
      "shake",
      "trajectory"
    ],
    "items": [
      {
        "name": "translateX · translateY · translateZ",
        "demo": "translate-axis",
        "description": "각 축의 이동량을 독립적으로 변경합니다."
      },
      {
        "name": "원형 궤도 이동",
        "demo": "orbit",
        "description": "중심점을 기준으로 원을 그리며 회전합니다."
      },
      {
        "name": "타원형 궤도 이동",
        "demo": "ellipse-orbit",
        "description": "서로 다른 X·Y 반지름으로 타원 궤도를 만듭니다."
      },
      {
        "name": "사인파·웨이브 이동",
        "demo": "wave",
        "description": "사인 함수로 부드러운 파동 경로를 만듭니다."
      },
      {
        "name": "베지어 커브 이동",
        "demo": "bezier",
        "description": "제어점을 이용한 곡선 경로를 따라 이동합니다."
      },
      {
        "name": "SVG Path를 따라 이동",
        "demo": "svg-path",
        "description": "SVG 경로의 길이를 기준으로 객체 위치를 계산합니다."
      },
      {
        "name": "흔들림·진동",
        "demo": "shake",
        "description": "짧고 빠른 위치 변화로 충격이나 경고를 표현합니다."
      },
      {
        "name": "카메라 셰이크",
        "demo": "camera-shake",
        "description": "장면 전체를 미세하게 흔들어 충격감을 줍니다."
      },
      {
        "name": "부유하는 Floating",
        "demo": "float",
        "description": "작은 상하 이동과 회전을 반복해 떠 있는 느낌을 냅니다."
      },
      {
        "name": "중력 낙하",
        "demo": "fall",
        "description": "가속되는 Y 이동으로 중력 낙하를 표현합니다."
      },
      {
        "name": "튕기기·바운스",
        "demo": "bounce",
        "description": "바닥 충돌 후 높이가 감소하는 반동을 표현합니다."
      },
      {
        "name": "관성 이동",
        "demo": "inertia",
        "description": "초기에는 빠르고 점점 느려지는 감속 이동입니다."
      },
      {
        "name": "오버슈트 후 제자리",
        "demo": "overshoot",
        "description": "목표 위치를 지나쳤다가 되돌아옵니다."
      },
      {
        "name": "랜덤 워크",
        "demo": "random-walk",
        "description": "매 구간 무작위 방향으로 이동하는 불규칙한 움직임입니다."
      },
      {
        "name": "지그재그 이동",
        "demo": "zigzag",
        "description": "좌우 방향을 번갈아 바꾸며 전진합니다."
      },
      {
        "name": "나선형 이동",
        "demo": "spiral",
        "description": "반지름이 변하는 회전 경로를 따라 이동합니다."
      },
      {
        "name": "두 지점 사이 왕복",
        "demo": "pingpong",
        "description": "시작점과 끝점을 반복해서 오갑니다."
      },
      {
        "name": "Trail 추적 이동",
        "demo": "motion-trail",
        "description": "뒤따르는 복제 요소로 이동 잔상을 만듭니다."
      },
      {
        "name": "마우스·포인터 경로 재현",
        "demo": "pointer-path",
        "description": "커서가 여러 지점을 클릭하는 흐름을 재현합니다."
      },
      {
        "name": "지도 위 경로 이동",
        "demo": "map-route",
        "description": "지도형 경로 위에서 이동 진행도를 보여줍니다."
      }
    ]
  },
  {
    "id": 2,
    "slug": "size-shape",
    "title": "크기·스케일·형태 변화",
    "english": "Size, Scale & Shape",
    "description": "요소의 치수, 축별 스케일, 형태와 레이아웃을 변화시켜 강조·등장·확장 동작을 만듭니다.",
    "keywords": [
      "scale",
      "width",
      "height",
      "morph",
      "squash",
      "layout"
    ],
    "items": [
      {
        "name": "Width · Height 조절",
        "demo": "dimension",
        "description": "Width · Height 조절 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Scale · ScaleX · ScaleY · ScaleZ",
        "demo": "scale-axes",
        "description": "Scale · ScaleX · ScaleY · ScaleZ 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Squash & Stretch",
        "demo": "squash",
        "description": "Squash & Stretch 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Pulse",
        "demo": "pulse",
        "description": "Pulse 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Breathing",
        "demo": "breathing",
        "description": "Breathing 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Zoom in · Zoom out",
        "demo": "zoom",
        "description": "Zoom in · Zoom out 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "축별 비대칭 확대",
        "demo": "asymmetric-scale",
        "description": "축별 비대칭 확대 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "원이 타원으로 변하기",
        "demo": "circle-ellipse",
        "description": "원이 타원으로 변하기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "카드·패널 펼치기",
        "demo": "panel-unfold",
        "description": "카드·패널 펼치기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "아코디언 열고 닫기",
        "demo": "accordion",
        "description": "아코디언 열고 닫기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "진행률 막대 성장",
        "demo": "progress-bar",
        "description": "진행률 막대 성장 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "원형 그래프 채우기",
        "demo": "progress-ring",
        "description": "원형 그래프 채우기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "말풍선 팝업",
        "demo": "speech-bubble",
        "description": "말풍선 팝업 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "버튼 눌림 효과",
        "demo": "button-press",
        "description": "버튼 눌림 효과 효과를 프레임 기반으로 시각화합니다."
      }
    ]
  },
  {
    "id": 3,
    "slug": "rotation-distortion",
    "title": "회전·기울기·왜곡",
    "english": "Rotation, Tilt & Distortion",
    "description": "2D·3D 회전, 기울기, 원근과 회전축을 조합해 입체적인 움직임을 표현합니다.",
    "keywords": [
      "rotate",
      "skew",
      "perspective",
      "flip",
      "tilt"
    ],
    "items": [
      {
        "name": "Rotate",
        "demo": "rotate",
        "description": "Rotate 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "RotateX · RotateY · RotateZ",
        "demo": "rotate-3d",
        "description": "RotateX · RotateY · RotateZ 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "SkewX · SkewY",
        "demo": "skew",
        "description": "SkewX · SkewY 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "3D 카드 플립",
        "demo": "card-flip",
        "description": "3D 카드 플립 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "동전 회전",
        "demo": "coin-spin",
        "description": "동전 회전 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "주사위 회전",
        "demo": "dice-spin",
        "description": "주사위 회전 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "책장 넘기기",
        "demo": "page-turn",
        "description": "책장 넘기기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "좌우·상하 틸트",
        "demo": "tilt",
        "description": "좌우·상하 틸트 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Perspective 변화",
        "demo": "perspective",
        "description": "Perspective 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Transform Origin 이동",
        "demo": "origin-shift",
        "description": "Transform Origin 이동 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "회전축 변경",
        "demo": "axis-shift",
        "description": "회전축 변경 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "흔들리는 간판",
        "demo": "sign-swing",
        "description": "흔들리는 간판 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "진자 운동",
        "demo": "pendulum",
        "description": "진자 운동 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "롤링·텀블링",
        "demo": "tumble",
        "description": "롤링·텀블링 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "3D 큐브 전환",
        "demo": "cube-transition",
        "description": "3D 큐브 전환 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "원근 앞뒤 이동",
        "demo": "depth-motion",
        "description": "원근 앞뒤 이동 효과를 프레임 기반으로 시각화합니다."
      }
    ]
  },
  {
    "id": 4,
    "slug": "opacity-visibility",
    "title": "투명도·등장·퇴장",
    "english": "Opacity, Entrance & Exit",
    "description": "투명도와 보조 속성을 결합해 요소가 나타나고 사라지는 방식을 설계합니다.",
    "keywords": [
      "opacity",
      "fade",
      "crossfade",
      "stagger",
      "reveal"
    ],
    "items": [
      {
        "name": "Fade In · Fade Out",
        "demo": "fade",
        "description": "Fade In · Fade Out 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Crossfade",
        "demo": "crossfade",
        "description": "Crossfade 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "깜빡임",
        "demo": "blink",
        "description": "깜빡임 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "점멸·Flicker",
        "demo": "flicker",
        "description": "점멸·Flicker 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Ghosting",
        "demo": "ghost",
        "description": "Ghosting 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "잔상·Afterimage",
        "demo": "afterimage",
        "description": "잔상·Afterimage 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "일정 구간만 보이기",
        "demo": "visibility-range",
        "description": "일정 구간만 보이기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "한 글자씩 나타나기",
        "demo": "char-reveal",
        "description": "한 글자씩 나타나기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "마스크 안에서 등장",
        "demo": "masked-entrance",
        "description": "마스크 안에서 등장 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "레이어 간 디졸브",
        "demo": "layer-dissolve",
        "description": "레이어 간 디졸브 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "블러를 동반한 등장",
        "demo": "blur-entrance",
        "description": "블러를 동반한 등장 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "스케일을 동반한 팝업",
        "demo": "scale-popup",
        "description": "스케일을 동반한 팝업 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "여러 요소 순차 등장·Stagger",
        "demo": "stagger",
        "description": "여러 요소 순차 등장·Stagger 효과를 프레임 기반으로 시각화합니다."
      }
    ]
  },
  {
    "id": 5,
    "slug": "color",
    "title": "색상 애니메이션",
    "english": "Color Animation",
    "description": "색상 공간, 그라디언트와 각종 색 관련 속성을 시간에 따라 보간합니다.",
    "keywords": [
      "color",
      "gradient",
      "hue",
      "fill",
      "stroke"
    ],
    "items": [
      {
        "name": "배경색 변화",
        "demo": "background-color",
        "description": "배경색 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "글자색 변화",
        "demo": "text-color",
        "description": "글자색 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "테두리색 변화",
        "demo": "border-color",
        "description": "테두리색 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "SVG Fill 변화",
        "demo": "svg-fill",
        "description": "SVG Fill 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "SVG Stroke 변화",
        "demo": "svg-stroke",
        "description": "SVG Stroke 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "그림자 색상 변화",
        "demo": "shadow-color",
        "description": "그림자 색상 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "빛 색상 변화",
        "demo": "light-color",
        "description": "빛 색상 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "알파값 변화",
        "demo": "alpha-color",
        "description": "알파값 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Hue 회전",
        "demo": "hue-rotate",
        "description": "Hue 회전 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "그라디언트 색상 변화",
        "demo": "gradient-colors",
        "description": "그라디언트 색상 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "그라디언트 각도 변화",
        "demo": "gradient-angle",
        "description": "그라디언트 각도 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "그라디언트 중심점 이동",
        "demo": "gradient-center",
        "description": "그라디언트 중심점 이동 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "컬러 스톱 위치 이동",
        "demo": "gradient-stop",
        "description": "컬러 스톱 위치 이동 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "다크 모드 ↔ 라이트 모드",
        "demo": "theme-switch",
        "description": "다크 모드 ↔ 라이트 모드 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "흑백 ↔ 컬러",
        "demo": "grayscale-color",
        "description": "흑백 ↔ 컬러 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "열화상 색상 변화",
        "demo": "thermal-color",
        "description": "열화상 색상 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "브랜드 컬러 간 전환",
        "demo": "brand-color",
        "description": "브랜드 컬러 간 전환 효과를 프레임 기반으로 시각화합니다."
      }
    ]
  },
  {
    "id": 6,
    "slug": "border-box",
    "title": "테두리·모서리·박스 스타일",
    "english": "Border, Corner & Box Style",
    "description": "테두리, 모서리, 그림자와 레이아웃 간격을 움직여 UI 요소의 형태와 강조를 변화시킵니다.",
    "keywords": [
      "border",
      "radius",
      "shadow",
      "outline",
      "layout"
    ],
    "items": [
      {
        "name": "Border Radius",
        "demo": "border-radius",
        "description": "Border Radius 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Border Width",
        "demo": "border-width",
        "description": "Border Width 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Outline",
        "demo": "outline",
        "description": "Outline 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "점선 간격 변화",
        "demo": "dash-gap",
        "description": "점선 간격 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "모서리가 둥글어지기",
        "demo": "round-corners",
        "description": "모서리가 둥글어지기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "원형 ↔ 사각형",
        "demo": "circle-square",
        "description": "원형 ↔ 사각형 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "카드 테두리 그리기",
        "demo": "border-draw",
        "description": "카드 테두리 그리기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "그림자 거리·퍼짐·블러",
        "demo": "box-shadow",
        "description": "그림자 거리·퍼짐·블러 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "내부 그림자",
        "demo": "inner-shadow",
        "description": "내부 그림자 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "네온 테두리",
        "demo": "neon-border",
        "description": "네온 테두리 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "발광 테두리",
        "demo": "glow-border",
        "description": "발광 테두리 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "대시 테두리 이동",
        "demo": "marching-ants",
        "description": "대시 테두리 이동 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Padding · Margin · Gap",
        "demo": "spacing",
        "description": "Padding · Margin · Gap 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Flex · Grid 비율 변화",
        "demo": "layout-ratio",
        "description": "Flex · Grid 비율 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "요소 순서 변경",
        "demo": "reorder",
        "description": "요소 순서 변경 효과를 프레임 기반으로 시각화합니다."
      }
    ]
  },
  {
    "id": 7,
    "slug": "mask-clipping",
    "title": "마스크·클리핑·리빌",
    "english": "Mask, Clipping & Reveal",
    "description": "보이는 영역 자체를 움직여 다양한 방향과 형태의 리빌 및 합성 효과를 만듭니다.",
    "keywords": [
      "clip-path",
      "mask",
      "wipe",
      "iris",
      "reveal"
    ],
    "items": [
      {
        "name": "Clip Path Inset",
        "demo": "clip-inset",
        "description": "Clip Path Inset 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "원형 Clip Path",
        "demo": "clip-circle",
        "description": "원형 Clip Path 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "타원형 Clip Path",
        "demo": "clip-ellipse",
        "description": "타원형 Clip Path 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Polygon 클리핑",
        "demo": "clip-polygon",
        "description": "Polygon 클리핑 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "왼쪽부터 Reveal",
        "demo": "reveal-left",
        "description": "왼쪽부터 Reveal 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "중앙에서 양쪽 Reveal",
        "demo": "reveal-center",
        "description": "중앙에서 양쪽 Reveal 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "원형 Iris Reveal",
        "demo": "iris",
        "description": "원형 Iris Reveal 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "대각선 Wipe",
        "demo": "diagonal-wipe",
        "description": "대각선 Wipe 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "블라인드 Reveal",
        "demo": "blinds",
        "description": "블라인드 Reveal 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "지퍼 Reveal",
        "demo": "zipper",
        "description": "지퍼 Reveal 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "글자 형태 안의 영상",
        "demo": "text-mask",
        "description": "글자 형태 안의 영상 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "로고 형태 Reveal",
        "demo": "logo-mask",
        "description": "로고 형태 Reveal 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "알파 마스크",
        "demo": "alpha-mask",
        "description": "알파 마스크 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "루마 마스크",
        "demo": "luma-mask",
        "description": "루마 마스크 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "SVG 마스크",
        "demo": "svg-mask",
        "description": "SVG 마스크 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "여러 마스크 합성",
        "demo": "mask-combine",
        "description": "여러 마스크 합성 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "액체형 마스크 왜곡",
        "demo": "liquid-mask",
        "description": "액체형 마스크 왜곡 효과를 프레임 기반으로 시각화합니다."
      }
    ]
  },
  {
    "id": 8,
    "slug": "filters-effects",
    "title": "블러·빛·색보정·필터",
    "english": "Blur, Light, Color Grade & Filters",
    "description": "CSS 필터와 픽셀 기반 효과를 조합해 화면의 질감, 빛, 색조와 왜곡을 변화시킵니다.",
    "keywords": [
      "blur",
      "filter",
      "glow",
      "glitch",
      "grade"
    ],
    "items": [
      {
        "name": "Gaussian Blur",
        "demo": "gaussian-blur",
        "description": "Gaussian Blur 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Progressive Blur",
        "demo": "progressive-blur",
        "description": "Progressive Blur 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Radial Progressive Blur",
        "demo": "radial-blur",
        "description": "Radial Progressive Blur 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Zoom Blur",
        "demo": "zoom-blur",
        "description": "Zoom Blur 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Brightness",
        "demo": "brightness",
        "description": "Brightness 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Contrast",
        "demo": "contrast",
        "description": "Contrast 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Saturation",
        "demo": "saturation",
        "description": "Saturation 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Grayscale",
        "demo": "grayscale",
        "description": "Grayscale 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Invert",
        "demo": "invert",
        "description": "Invert 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Hue Rotation",
        "demo": "filter-hue",
        "description": "Hue Rotation 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Tint",
        "demo": "tint",
        "description": "Tint 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Duotone",
        "demo": "duotone",
        "description": "Duotone 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Thermal Vision",
        "demo": "thermal",
        "description": "Thermal Vision 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Greenscreen Color Key",
        "demo": "greenscreen",
        "description": "Greenscreen Color Key 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Drop Shadow",
        "demo": "drop-shadow",
        "description": "Drop Shadow 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Glow",
        "demo": "glow",
        "description": "Glow 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Light Trail",
        "demo": "light-trail",
        "description": "Light Trail 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Gradient Effect",
        "demo": "gradient-effect",
        "description": "Gradient Effect 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Venetian Blinds Reveal",
        "demo": "venetian",
        "description": "Venetian Blinds Reveal 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Directional Reveal",
        "demo": "directional-reveal",
        "description": "Directional Reveal 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Sepia",
        "demo": "sepia",
        "description": "Sepia 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Chromatic Aberration",
        "demo": "chromatic",
        "description": "Chromatic Aberration 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "RGB Split",
        "demo": "rgb-split",
        "description": "RGB Split 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "VHS · CRT",
        "demo": "vhs",
        "description": "VHS · CRT 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Film Grain",
        "demo": "film-grain",
        "description": "Film Grain 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Scan Line",
        "demo": "scanline",
        "description": "Scan Line 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Glitch",
        "demo": "glitch",
        "description": "Glitch 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Pixelation",
        "demo": "pixelation",
        "description": "Pixelation 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Posterization",
        "demo": "posterize",
        "description": "Posterization 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Sharpen",
        "demo": "sharpen",
        "description": "Sharpen 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Bloom",
        "demo": "bloom",
        "description": "Bloom 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Lens Flare",
        "demo": "lens-flare",
        "description": "Lens Flare 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Vignette",
        "demo": "vignette",
        "description": "Vignette 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Fisheye",
        "demo": "fisheye",
        "description": "Fisheye 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Heat Haze",
        "demo": "heat-haze",
        "description": "Heat Haze 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Lens Distortion",
        "demo": "lens-distortion",
        "description": "Lens Distortion 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Kaleidoscope",
        "demo": "kaleidoscope",
        "description": "Kaleidoscope 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Halftone",
        "demo": "halftone",
        "description": "Halftone 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Emboss",
        "demo": "emboss",
        "description": "Emboss 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Edge Detection",
        "demo": "edge-detection",
        "description": "Edge Detection 효과를 프레임 기반으로 시각화합니다."
      }
    ]
  },
  {
    "id": 9,
    "slug": "svg-vector",
    "title": "SVG·벡터 애니메이션",
    "english": "SVG & Vector Animation",
    "description": "경로 길이, 점, 도형 파라미터와 마스크를 이용해 벡터 그래픽을 정밀하게 움직입니다.",
    "keywords": [
      "SVG",
      "path",
      "stroke",
      "morph",
      "vector"
    ],
    "items": [
      {
        "name": "선이 그려지는 효과",
        "demo": "line-draw",
        "description": "선이 그려지는 효과 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Stroke Dasharray",
        "demo": "stroke-dasharray",
        "description": "Stroke Dasharray 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Stroke Dashoffset",
        "demo": "stroke-dashoffset",
        "description": "Stroke Dashoffset 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Path Reveal",
        "demo": "path-reveal",
        "description": "Path Reveal 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Path를 따라 오브젝트 이동",
        "demo": "object-on-path",
        "description": "Path를 따라 오브젝트 이동 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "두 SVG Path 사이 Morph",
        "demo": "path-morph",
        "description": "두 SVG Path 사이 Morph 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "도형 간 Shape Morph",
        "demo": "shape-morph",
        "description": "도형 간 Shape Morph 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Path 늘이기·줄이기",
        "demo": "path-stretch",
        "description": "Path 늘이기·줄이기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Path 뒤틀기",
        "demo": "path-warp",
        "description": "Path 뒤틀기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Path 자르기",
        "demo": "path-trim",
        "description": "Path 자르기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Path 역방향 재생",
        "demo": "path-reverse",
        "description": "Path 역방향 재생 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "손글씨처럼 그리기",
        "demo": "handwriting",
        "description": "손글씨처럼 그리기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "원형 진행 표시",
        "demo": "svg-ring",
        "description": "원형 진행 표시 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "체크 아이콘 그리기",
        "demo": "check-draw",
        "description": "체크 아이콘 그리기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "지도 경로 그리기",
        "demo": "svg-map-route",
        "description": "지도 경로 그리기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "선 끝을 따라 빛 이동",
        "demo": "path-light",
        "description": "선 끝을 따라 빛 이동 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "도형 파라미터 변화",
        "demo": "shape-parameters",
        "description": "도형 파라미터 변화 효과를 프레임 기반으로 시각화합니다."
      }
    ]
  },
  {
    "id": 10,
    "slug": "typography",
    "title": "텍스트·타이포그래피 애니메이션",
    "english": "Text & Typography Animation",
    "description": "문자·단어·문장 단위의 등장, 변형, 강조와 숫자 표현을 구현합니다.",
    "keywords": [
      "text",
      "typewriter",
      "caption",
      "kinetic",
      "letter"
    ],
    "items": [
      {
        "name": "타자기 효과",
        "demo": "typewriter",
        "description": "타자기 효과 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "한 글자씩 등장",
        "demo": "letters-in",
        "description": "한 글자씩 등장 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "한 단어씩 등장",
        "demo": "words-in",
        "description": "한 단어씩 등장 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "한 줄씩 등장",
        "demo": "lines-in",
        "description": "한 줄씩 등장 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "랜덤 문자 → 실제 문자",
        "demo": "decode-text",
        "description": "랜덤 문자 → 실제 문자 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "글자 섞기·Scramble",
        "demo": "scramble",
        "description": "글자 섞기·Scramble 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "숫자 Count Up · Count Down",
        "demo": "count-number",
        "description": "숫자 Count Up · Count Down 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "가격·퍼센트 롤링",
        "demo": "rolling-number",
        "description": "가격·퍼센트 롤링 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Letter Spacing 변화",
        "demo": "letter-spacing",
        "description": "Letter Spacing 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Line Height 변화",
        "demo": "line-height",
        "description": "Line Height 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Font Size 변화",
        "demo": "font-size",
        "description": "Font Size 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Font Weight 변화",
        "demo": "font-weight",
        "description": "Font Weight 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Variable Font Axis",
        "demo": "variable-font",
        "description": "Variable Font Axis 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "글자 기울기",
        "demo": "font-slant",
        "description": "글자 기울기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "글자별 회전",
        "demo": "letter-rotate",
        "description": "글자별 회전 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "글자별 웨이브",
        "demo": "letter-wave",
        "description": "글자별 웨이브 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "글자별 바운스",
        "demo": "letter-bounce",
        "description": "글자별 바운스 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "글자별 색상 변화",
        "demo": "letter-color",
        "description": "글자별 색상 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Karaoke 하이라이트",
        "demo": "karaoke",
        "description": "Karaoke 하이라이트 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "말하는 단어 강조",
        "demo": "active-word",
        "description": "말하는 단어 강조 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "밑줄 그리기",
        "demo": "underline-draw",
        "description": "밑줄 그리기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "형광펜 칠하기",
        "demo": "marker-highlight",
        "description": "형광펜 칠하기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "원·박스로 단어 강조",
        "demo": "word-outline",
        "description": "원·박스로 단어 강조 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "텍스트 내부 영상·그라디언트",
        "demo": "text-fill-media",
        "description": "텍스트 내부 영상·그라디언트 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "텍스트가 입자로 흩어지기",
        "demo": "text-particles",
        "description": "텍스트가 입자로 흩어지기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "텍스트가 액체처럼 녹기",
        "demo": "text-melt",
        "description": "텍스트가 액체처럼 녹기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "3D 텍스트 회전",
        "demo": "text-3d",
        "description": "3D 텍스트 회전 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "자막 팝업·점프·확대",
        "demo": "caption-pop",
        "description": "자막 팝업·점프·확대 효과를 프레임 기반으로 시각화합니다."
      }
    ]
  },
  {
    "id": 11,
    "slug": "ui-interface",
    "title": "UI·인터페이스 애니메이션",
    "english": "UI & Interface Animation",
    "description": "앱·웹 인터페이스의 상태 변화와 사용자 입력 흐름을 영상으로 재현합니다.",
    "keywords": [
      "UI",
      "button",
      "toggle",
      "modal",
      "cursor"
    ],
    "items": [
      {
        "name": "버튼 클릭",
        "demo": "ui-button",
        "description": "버튼 클릭 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "토글 전환",
        "demo": "ui-toggle",
        "description": "토글 전환 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "체크박스 체크",
        "demo": "ui-checkbox",
        "description": "체크박스 체크 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "드롭다운 열기",
        "demo": "ui-dropdown",
        "description": "드롭다운 열기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "모달 팝업",
        "demo": "ui-modal",
        "description": "모달 팝업 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "툴팁 등장",
        "demo": "ui-tooltip",
        "description": "툴팁 등장 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "탭 이동",
        "demo": "ui-tabs",
        "description": "탭 이동 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "메뉴 확장",
        "demo": "ui-menu",
        "description": "메뉴 확장 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "스크롤 재현",
        "demo": "ui-scroll",
        "description": "스크롤 재현 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "채팅 메시지 등장",
        "demo": "ui-chat",
        "description": "채팅 메시지 등장 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "알림 토스트",
        "demo": "ui-toast",
        "description": "알림 토스트 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "로딩 스피너",
        "demo": "ui-spinner",
        "description": "로딩 스피너 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Skeleton Loading",
        "demo": "ui-skeleton",
        "description": "Skeleton Loading 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Progress Bar",
        "demo": "ui-progress",
        "description": "Progress Bar 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Slider 이동",
        "demo": "ui-slider",
        "description": "Slider 이동 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Cursor 이동",
        "demo": "ui-cursor",
        "description": "Cursor 이동 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "마우스 클릭 Ripple",
        "demo": "ui-ripple",
        "description": "마우스 클릭 Ripple 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "앱 화면 전환",
        "demo": "ui-screen",
        "description": "앱 화면 전환 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "리스트 정렬·재배치",
        "demo": "ui-sort",
        "description": "리스트 정렬·재배치 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "드래그 앤 드롭",
        "demo": "ui-drag",
        "description": "드래그 앤 드롭 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "모바일 Swipe",
        "demo": "ui-swipe",
        "description": "모바일 Swipe 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "페이지 스크롤",
        "demo": "ui-page-scroll",
        "description": "페이지 스크롤 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "브라우저·스마트폰 목업",
        "demo": "ui-device",
        "description": "브라우저·스마트폰 목업 효과를 프레임 기반으로 시각화합니다."
      }
    ]
  },
  {
    "id": 12,
    "slug": "data-viz",
    "title": "데이터 시각화",
    "english": "Data Visualization",
    "description": "수치와 데이터 구조가 변화하는 과정을 차트, 게이지와 네트워크로 보여줍니다.",
    "keywords": [
      "chart",
      "data",
      "graph",
      "counter",
      "gauge"
    ],
    "items": [
      {
        "name": "막대그래프 성장",
        "demo": "chart-bars",
        "description": "막대그래프 성장 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "라인차트 그리기",
        "demo": "chart-line",
        "description": "라인차트 그리기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "영역 그래프 Reveal",
        "demo": "chart-area",
        "description": "영역 그래프 Reveal 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "파이·도넛 차트 채우기",
        "demo": "chart-pie",
        "description": "파이·도넛 차트 채우기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "숫자 카운터",
        "demo": "chart-counter",
        "description": "숫자 카운터 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "게이지",
        "demo": "chart-gauge",
        "description": "게이지 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Progress Ring",
        "demo": "chart-ring",
        "description": "Progress Ring 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Scatter Plot 등장",
        "demo": "chart-scatter",
        "description": "Scatter Plot 등장 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "순위 변화",
        "demo": "chart-ranking",
        "description": "순위 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "데이터 포인트 Pulse",
        "demo": "chart-point-pulse",
        "description": "데이터 포인트 Pulse 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "축·눈금 등장",
        "demo": "chart-axis",
        "description": "축·눈금 등장 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "히트맵 변화",
        "demo": "chart-heatmap",
        "description": "히트맵 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "타임라인 진행",
        "demo": "chart-timeline",
        "description": "타임라인 진행 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Sankey Flow",
        "demo": "chart-sankey",
        "description": "Sankey Flow 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Network Graph",
        "demo": "chart-network",
        "description": "Network Graph 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "주가 차트 움직임",
        "demo": "chart-stock",
        "description": "주가 차트 움직임 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "데이터 기반 색·크기·위치",
        "demo": "chart-encoded",
        "description": "데이터 기반 색·크기·위치 효과를 프레임 기반으로 시각화합니다."
      }
    ]
  },
  {
    "id": 13,
    "slug": "transitions",
    "title": "장면 전환",
    "english": "Scene Transitions",
    "description": "두 장면 사이의 공간, 투명도, 블러와 왜곡을 조절해 컷의 연결 방식을 결정합니다.",
    "keywords": [
      "transition",
      "fade",
      "wipe",
      "slide",
      "dissolve"
    ],
    "items": [
      {
        "name": "Fade",
        "demo": "transition-fade",
        "description": "Fade 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Slide",
        "demo": "transition-slide",
        "description": "Slide 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Wipe",
        "demo": "transition-wipe",
        "description": "Wipe 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Flip",
        "demo": "transition-flip",
        "description": "Flip 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Clock Wipe",
        "demo": "transition-clock",
        "description": "Clock Wipe 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Iris",
        "demo": "transition-iris",
        "description": "Iris 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Book Flip",
        "demo": "transition-book",
        "description": "Book Flip 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Zoom Blur",
        "demo": "transition-zoom-blur",
        "description": "Zoom Blur 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Dreamy Zoom",
        "demo": "transition-dreamy",
        "description": "Dreamy Zoom 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Film Burn",
        "demo": "transition-film-burn",
        "description": "Film Burn 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Linear Blur",
        "demo": "transition-linear-blur",
        "description": "Linear Blur 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Zoom In Out",
        "demo": "transition-zoom",
        "description": "Zoom In Out 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Dissolve",
        "demo": "transition-dissolve",
        "description": "Dissolve 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Ripple",
        "demo": "transition-ripple",
        "description": "Ripple 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Crosswarp",
        "demo": "transition-crosswarp",
        "description": "Crosswarp 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Cross Zoom",
        "demo": "transition-crosszoom",
        "description": "Cross Zoom 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Swap",
        "demo": "transition-swap",
        "description": "Swap 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Cube",
        "demo": "transition-cube",
        "description": "Cube 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "None · Hard Cut",
        "demo": "transition-none",
        "description": "None · Hard Cut 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "사용자 정의 Transition",
        "demo": "transition-custom",
        "description": "사용자 정의 Transition 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "오디오 포함 Transition",
        "demo": "transition-audio",
        "description": "오디오 포함 Transition 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Light Leak Overlay",
        "demo": "transition-light-leak",
        "description": "Light Leak Overlay 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Flash Overlay",
        "demo": "transition-flash",
        "description": "Flash Overlay 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Dust Overlay",
        "demo": "transition-dust",
        "description": "Dust Overlay 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Particle Overlay",
        "demo": "transition-particle",
        "description": "Particle Overlay 효과를 프레임 기반으로 시각화합니다."
      }
    ]
  },
  {
    "id": 14,
    "slug": "camera-25d",
    "title": "카메라·2.5D 애니메이션",
    "english": "Camera & 2.5D Animation",
    "description": "레이어 깊이와 가상 카메라를 이용해 평면 이미지를 공간감 있는 장면으로 만듭니다.",
    "keywords": [
      "camera",
      "parallax",
      "zoom",
      "dolly",
      "focus"
    ],
    "items": [
      {
        "name": "Pan",
        "demo": "camera-pan",
        "description": "Pan 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Tilt",
        "demo": "camera-tilt",
        "description": "Tilt 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Roll",
        "demo": "camera-roll",
        "description": "Roll 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Zoom",
        "demo": "camera-zoom",
        "description": "Zoom 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Ken Burns",
        "demo": "ken-burns",
        "description": "Ken Burns 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Dolly In · Dolly Out",
        "demo": "camera-dolly",
        "description": "Dolly In · Dolly Out 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Orbit Camera",
        "demo": "camera-orbit",
        "description": "Orbit Camera 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "카메라 셰이크",
        "demo": "camera-impact",
        "description": "카메라 셰이크 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "핸드헬드 흔들림",
        "demo": "camera-handheld",
        "description": "핸드헬드 흔들림 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Parallax",
        "demo": "parallax",
        "description": "Parallax 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "다중 레이어 속도 차이",
        "demo": "layer-speed",
        "description": "다중 레이어 속도 차이 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "전경·중경·배경 분리",
        "demo": "depth-layers",
        "description": "전경·중경·배경 분리 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "깊이에 따른 블러",
        "demo": "depth-blur",
        "description": "깊이에 따른 블러 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "가상 포커스 이동",
        "demo": "rack-focus",
        "description": "가상 포커스 이동 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "원근 확대",
        "demo": "perspective-zoom",
        "description": "원근 확대 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "무한 줌",
        "demo": "infinite-zoom",
        "description": "무한 줌 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "사진의 3D 공간화",
        "demo": "photo-3d",
        "description": "사진의 3D 공간화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "디바이스 화면 안으로 진입",
        "demo": "device-enter",
        "description": "디바이스 화면 안으로 진입 효과를 프레임 기반으로 시각화합니다."
      }
    ]
  },
  {
    "id": 15,
    "slug": "three-d",
    "title": "실제 3D 애니메이션",
    "english": "Real 3D Animation",
    "description": "3D 객체, 카메라, 조명, 재질과 모델 애니메이션을 React Three Fiber 방식으로 구성합니다.",
    "keywords": [
      "3D",
      "three",
      "camera",
      "lighting",
      "material"
    ],
    "items": [
      {
        "name": "3D 오브젝트 이동·회전·스케일",
        "demo": "three-transform",
        "description": "3D 오브젝트 이동·회전·스케일 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "3D 카메라 이동",
        "demo": "three-camera",
        "description": "3D 카메라 이동 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Perspective · Orthographic Camera",
        "demo": "three-camera-type",
        "description": "Perspective · Orthographic Camera 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "조명 이동",
        "demo": "three-light-move",
        "description": "조명 이동 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "조명 밝기·색상",
        "demo": "three-light-color",
        "description": "조명 밝기·색상 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "그림자 변화",
        "demo": "three-shadow",
        "description": "그림자 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "재질 변화",
        "demo": "three-material",
        "description": "재질 변화 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Texture 이동",
        "demo": "three-texture",
        "description": "Texture 이동 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "영상 Texture",
        "demo": "three-video-texture",
        "description": "영상 Texture 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "3D 텍스트",
        "demo": "three-text",
        "description": "3D 텍스트 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "모델 등장·분해·조립",
        "demo": "three-explode",
        "description": "모델 등장·분해·조립 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Morph Target",
        "demo": "three-morph",
        "description": "Morph Target 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Skeletal Animation",
        "demo": "three-skeleton",
        "description": "Skeletal Animation 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "제품 360도 회전",
        "demo": "three-product",
        "description": "제품 360도 회전 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "3D 파티클 시스템",
        "demo": "three-particles",
        "description": "3D 파티클 시스템 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Instancing",
        "demo": "three-instancing",
        "description": "Instancing 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "반사·굴절",
        "demo": "three-refraction",
        "description": "반사·굴절 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Depth of Field",
        "demo": "three-dof",
        "description": "Depth of Field 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "3D 전환",
        "demo": "three-transition",
        "description": "3D 전환 효과를 프레임 기반으로 시각화합니다."
      }
    ]
  },
  {
    "id": 16,
    "slug": "particles-procedural",
    "title": "파티클·프로시저럴 애니메이션",
    "english": "Particles & Procedural Animation",
    "description": "다수의 입자와 노이즈 기반 규칙을 이용해 자연 현상, 폭발, 흐름과 군집을 생성합니다.",
    "keywords": [
      "particle",
      "noise",
      "confetti",
      "fire",
      "trail"
    ],
    "items": [
      {
        "name": "Confetti",
        "demo": "particle-confetti",
        "description": "Confetti 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "눈",
        "demo": "particle-snow",
        "description": "눈 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "비",
        "demo": "particle-rain",
        "description": "비 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "먼지",
        "demo": "particle-dust",
        "description": "먼지 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "불꽃·Spark",
        "demo": "particle-spark",
        "description": "불꽃·Spark 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "연기",
        "demo": "particle-smoke",
        "description": "연기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "안개",
        "demo": "particle-fog",
        "description": "안개 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "구름",
        "demo": "particle-cloud",
        "description": "구름 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "별",
        "demo": "particle-star",
        "description": "별 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "반짝이",
        "demo": "particle-glitter",
        "description": "반짝이 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "빛 알갱이",
        "demo": "particle-light",
        "description": "빛 알갱이 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "버블",
        "demo": "particle-bubble",
        "description": "버블 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "꽃가루",
        "demo": "particle-pollen",
        "description": "꽃가루 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "폭발",
        "demo": "particle-explosion",
        "description": "폭발 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "불",
        "demo": "particle-fire",
        "description": "불 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "액체",
        "demo": "particle-liquid",
        "description": "액체 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "파도",
        "demo": "particle-wave",
        "description": "파도 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Flow Field",
        "demo": "particle-flow",
        "description": "Flow Field 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "입자가 글자·로고로 모이기",
        "demo": "particle-form",
        "description": "입자가 글자·로고로 모이기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "입자가 흩어지기",
        "demo": "particle-scatter",
        "description": "입자가 흩어지기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Trail",
        "demo": "particle-trail",
        "description": "Trail 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Noise 기반 배경",
        "demo": "particle-noise",
        "description": "Noise 기반 배경 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Light Leak",
        "demo": "particle-light-leak",
        "description": "Light Leak 효과를 프레임 기반으로 시각화합니다."
      }
    ]
  },
  {
    "id": 17,
    "slug": "shader-pixel",
    "title": "Shader·픽셀 기반 애니메이션",
    "english": "Shader & Pixel Animation",
    "description": "픽셀 단위의 좌표·색상 계산으로 왜곡, 노이즈, 프랙털과 화면 전환 효과를 만듭니다.",
    "keywords": [
      "shader",
      "pixel",
      "WebGL",
      "distortion",
      "procedural"
    ],
    "items": [
      {
        "name": "Noise Displacement",
        "demo": "shader-noise",
        "description": "Noise Displacement 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Ripple",
        "demo": "shader-ripple",
        "description": "Ripple 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Liquid Distortion",
        "demo": "shader-liquid",
        "description": "Liquid Distortion 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Dissolve",
        "demo": "shader-dissolve",
        "description": "Dissolve 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "불타는 가장자리",
        "demo": "shader-burn",
        "description": "불타는 가장자리 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "화면 녹이기",
        "demo": "shader-melt",
        "description": "화면 녹이기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "모자이크",
        "demo": "shader-mosaic",
        "description": "모자이크 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Pixel Sorting",
        "demo": "shader-sort",
        "description": "Pixel Sorting 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "RGB Separation",
        "demo": "shader-rgb",
        "description": "RGB Separation 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Chromatic Aberration",
        "demo": "shader-chromatic",
        "description": "Chromatic Aberration 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Glitch",
        "demo": "shader-glitch",
        "description": "Glitch 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "CRT",
        "demo": "shader-crt",
        "description": "CRT 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "VHS",
        "demo": "shader-vhs",
        "description": "VHS 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Fisheye",
        "demo": "shader-fisheye",
        "description": "Fisheye 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Lens Distortion",
        "demo": "shader-lens",
        "description": "Lens Distortion 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Zoom Blur",
        "demo": "shader-zoom-blur",
        "description": "Zoom Blur 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Motion Blur",
        "demo": "shader-motion-blur",
        "description": "Motion Blur 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Procedural Gradient",
        "demo": "shader-gradient",
        "description": "Procedural Gradient 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Plasma",
        "demo": "shader-plasma",
        "description": "Plasma 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Lava Lamp",
        "demo": "shader-lava",
        "description": "Lava Lamp 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Fractal",
        "demo": "shader-fractal",
        "description": "Fractal 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Kaleidoscope",
        "demo": "shader-kaleido",
        "description": "Kaleidoscope 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Halftone",
        "demo": "shader-halftone",
        "description": "Halftone 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Tunnel",
        "demo": "shader-tunnel",
        "description": "Tunnel 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Infinite Zoom",
        "demo": "shader-infinite-zoom",
        "description": "Infinite Zoom 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "영상 표면 흔들기",
        "demo": "shader-surface",
        "description": "영상 표면 흔들기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Transition Shader",
        "demo": "shader-transition",
        "description": "Transition Shader 효과를 프레임 기반으로 시각화합니다."
      }
    ]
  },
  {
    "id": 18,
    "slug": "media-control",
    "title": "영상·이미지·애니메이션 파일 제어",
    "english": "Video, Image & Asset Control",
    "description": "영상과 이미지의 시간, 크롭, 속도, 반복, 합성과 외부 애니메이션 포맷을 제어합니다.",
    "keywords": [
      "video",
      "image",
      "media",
      "Lottie",
      "Rive"
    ],
    "items": [
      {
        "name": "영상 크롭",
        "demo": "media-crop",
        "description": "영상 크롭 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Pan & Scan",
        "demo": "media-pan-scan",
        "description": "Pan & Scan 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "확대·축소",
        "demo": "media-zoom",
        "description": "확대·축소 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "재생 구간 이동",
        "demo": "media-trim",
        "description": "재생 구간 이동 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "재생 속도 변경",
        "demo": "media-speed",
        "description": "재생 속도 변경 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Freeze Frame",
        "demo": "media-freeze",
        "description": "Freeze Frame 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Loop",
        "demo": "media-loop",
        "description": "Loop 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "특정 프레임 Scrubbing",
        "demo": "media-scrub",
        "description": "특정 프레임 Scrubbing 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "영상 위 마스크",
        "demo": "media-mask",
        "description": "영상 위 마스크 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "영상 위 필터",
        "demo": "media-filter",
        "description": "영상 위 필터 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Picture in Picture",
        "demo": "media-pip",
        "description": "Picture in Picture 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Split Screen",
        "demo": "media-split",
        "description": "Split Screen 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "여러 영상 동시 재생",
        "demo": "media-multi",
        "description": "여러 영상 동시 재생 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "이미지 시퀀스",
        "demo": "media-sequence",
        "description": "이미지 시퀀스 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "GIF",
        "demo": "media-gif",
        "description": "GIF 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Animated Image",
        "demo": "media-animated-image",
        "description": "Animated Image 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Lottie",
        "demo": "media-lottie",
        "description": "Lottie 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Rive",
        "demo": "media-rive",
        "description": "Rive 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Skia",
        "demo": "media-skia",
        "description": "Skia 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Animated Emoji",
        "demo": "media-emoji",
        "description": "Animated Emoji 효과를 프레임 기반으로 시각화합니다."
      }
    ]
  },
  {
    "id": 19,
    "slug": "audio-reactive",
    "title": "오디오 반응형 애니메이션",
    "english": "Audio-Reactive Animation",
    "description": "오디오의 음량, 주파수, 비트와 음성 구간을 시각 요소의 움직임으로 변환합니다.",
    "keywords": [
      "audio",
      "waveform",
      "spectrum",
      "beat",
      "frequency"
    ],
    "items": [
      {
        "name": "Waveform",
        "demo": "audio-waveform",
        "description": "Waveform 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Spectrum Analyzer",
        "demo": "audio-spectrum",
        "description": "Spectrum Analyzer 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Equalizer",
        "demo": "audio-equalizer",
        "description": "Equalizer 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Beat에 맞춘 확대",
        "demo": "audio-beat-scale",
        "description": "Beat에 맞춘 확대 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "킥에 맞춘 화면 흔들기",
        "demo": "audio-kick-shake",
        "description": "킥에 맞춘 화면 흔들기 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "음량에 따른 색상",
        "demo": "audio-volume-color",
        "description": "음량에 따른 색상 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "주파수별 파티클",
        "demo": "audio-frequency-particles",
        "description": "주파수별 파티클 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "말하는 사람에 따른 자막 강조",
        "demo": "audio-speaker-caption",
        "description": "말하는 사람에 따른 자막 강조 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Lip Sync",
        "demo": "audio-lipsync",
        "description": "Lip Sync 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "음성 구간 캐릭터 입",
        "demo": "audio-mouth",
        "description": "음성 구간 캐릭터 입 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "박자에 맞춘 컷 전환",
        "demo": "audio-beat-cut",
        "description": "박자에 맞춘 컷 전환 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "음악에 맞춘 카메라 펀치",
        "demo": "audio-camera-punch",
        "description": "음악에 맞춘 카메라 펀치 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Bass 기반 Glow · Blur",
        "demo": "audio-bass-glow",
        "description": "Bass 기반 Glow · Blur 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "무음 구간 자동 축소",
        "demo": "audio-silence-collapse",
        "description": "무음 구간 자동 축소 효과를 프레임 기반으로 시각화합니다."
      }
    ]
  },
  {
    "id": 20,
    "slug": "physics-math",
    "title": "물리·수학 기반 움직임",
    "english": "Physics & Math-Based Motion",
    "description": "스프링, 중력, 마찰, 충돌과 수학 함수를 이용해 자연스럽고 규칙적인 움직임을 만듭니다.",
    "keywords": [
      "physics",
      "spring",
      "gravity",
      "collision",
      "math"
    ],
    "items": [
      {
        "name": "Spring",
        "demo": "physics-spring",
        "description": "Spring 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Damped Spring",
        "demo": "physics-damped",
        "description": "Damped Spring 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Bounce",
        "demo": "physics-bounce",
        "description": "Bounce 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Overshoot",
        "demo": "physics-overshoot",
        "description": "Overshoot 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Elastic",
        "demo": "physics-elastic",
        "description": "Elastic 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Gravity",
        "demo": "physics-gravity",
        "description": "Gravity 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Friction",
        "demo": "physics-friction",
        "description": "Friction 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Inertia",
        "demo": "physics-inertia",
        "description": "Inertia 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Pendulum",
        "demo": "physics-pendulum",
        "description": "Pendulum 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Collision",
        "demo": "physics-collision",
        "description": "Collision 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Orbit",
        "demo": "physics-orbit",
        "description": "Orbit 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Follow",
        "demo": "physics-follow",
        "description": "Follow 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Rope · Chain",
        "demo": "physics-rope",
        "description": "Rope · Chain 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Flocking",
        "demo": "physics-flocking",
        "description": "Flocking 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Boids",
        "demo": "physics-boids",
        "description": "Boids 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Attraction · Repulsion",
        "demo": "physics-attraction",
        "description": "Attraction · Repulsion 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Magnetic Motion",
        "demo": "physics-magnetic",
        "description": "Magnetic Motion 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Simple Cloth Simulation",
        "demo": "physics-cloth",
        "description": "Simple Cloth Simulation 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Wave Equation",
        "demo": "physics-wave",
        "description": "Wave Equation 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Sine · Cosine Motion",
        "demo": "physics-sine",
        "description": "Sine · Cosine Motion 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Lissajous Curve",
        "demo": "physics-lissajous",
        "description": "Lissajous Curve 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Noise 기반 움직임",
        "demo": "physics-noise",
        "description": "Noise 기반 움직임 효과를 프레임 기반으로 시각화합니다."
      }
    ]
  },
  {
    "id": 21,
    "slug": "timing-easing",
    "title": "타이밍·이징·시퀀싱",
    "english": "Timing, Easing & Sequencing",
    "description": "같은 속성 변화에도 다른 속도 곡선, 지연, 반복과 순서를 적용해 움직임의 성격을 바꿉니다.",
    "keywords": [
      "timing",
      "easing",
      "spring",
      "stagger",
      "sequence"
    ],
    "items": [
      {
        "name": "Linear",
        "demo": "timing-linear",
        "description": "Linear 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Ease In",
        "demo": "timing-ease-in",
        "description": "Ease In 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Ease Out",
        "demo": "timing-ease-out",
        "description": "Ease Out 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Ease In Out",
        "demo": "timing-ease-in-out",
        "description": "Ease In Out 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Cubic Bézier",
        "demo": "timing-bezier",
        "description": "Cubic Bézier 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Spring",
        "demo": "timing-spring",
        "description": "Spring 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Bounce",
        "demo": "timing-bounce",
        "description": "Bounce 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Elastic",
        "demo": "timing-elastic",
        "description": "Elastic 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Overshoot",
        "demo": "timing-overshoot",
        "description": "Overshoot 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Delay",
        "demo": "timing-delay",
        "description": "Delay 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Stagger",
        "demo": "timing-stagger",
        "description": "Stagger 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Sequence",
        "demo": "timing-sequence",
        "description": "Sequence 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "동시 실행",
        "demo": "timing-parallel",
        "description": "동시 실행 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Loop",
        "demo": "timing-loop",
        "description": "Loop 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Ping Pong",
        "demo": "timing-pingpong",
        "description": "Ping Pong 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Hold",
        "demo": "timing-hold",
        "description": "Hold 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Step Animation",
        "demo": "timing-steps",
        "description": "Step Animation 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "Posterize",
        "demo": "timing-posterize",
        "description": "Posterize 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "랜덤 지연",
        "demo": "timing-random-delay",
        "description": "랜덤 지연 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "속도 램핑",
        "demo": "timing-ramp",
        "description": "속도 램핑 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "빠른 시작·느린 종료",
        "demo": "timing-fast-slow",
        "description": "빠른 시작·느린 종료 효과를 프레임 기반으로 시각화합니다."
      },
      {
        "name": "구간별 다른 Easing",
        "demo": "timing-multi-ease",
        "description": "구간별 다른 Easing 효과를 프레임 기반으로 시각화합니다."
      }
    ]
  }
];

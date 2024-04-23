import { CandleType, LineType, PolygonType, Styles, TooltipShowRule, TooltipShowType, YAxisPosition, YAxisType } from 'klinecharts';
import { COLORS, transparent } from "@shared/constant/tailwind-colors";

enum CandleTooltipRectPosition {
  Fixed = "fixed",
  Pointer = "pointer"
}

export const customStyle: Styles = {
  grid: {
    show: true,
    horizontal: {
      show: true,
      size: 1,
      color: transparent(COLORS.neutral_1, 0.2),
      style: LineType.Dashed,
      dashedValue: [1, 10]
    },
    vertical: {
      show: true,
      size: 1,
      color: transparent(COLORS.neutral_1, 0.2),
      style: LineType.Dashed,
      dashedValue: [1, 10]
    }
  },
  candle: {
    type: CandleType.Area,
    bar: {
      upColor: COLORS.teal_5,
      downColor: COLORS.rose_5,
      noChangeColor: COLORS.neutral_4,
      upBorderColor: COLORS.teal_5,
      downBorderColor: COLORS.rose_5,
      noChangeBorderColor: COLORS.neutral_4,
      upWickColor: COLORS.teal_5,
      downWickColor: COLORS.rose_5,
      noChangeWickColor: COLORS.neutral_4
    },
    area: {
      lineSize: 2,
      lineColor: COLORS.yellow_5,
      value: 'close',
      smooth: false,
      backgroundColor: [{
        offset: 0,
        color: transparent(COLORS.yellow_3, 0.01)
      }, {
        offset: 1,
        color: transparent(COLORS.yellow_9, 0.1)
      }],
      point: {
        show: true,
        color: COLORS.yellow_5,
        radius: 2,
        rippleColor: transparent(COLORS.yellow_3, 0.5),
        rippleRadius: 5,
        animation: true,
        animationDuration: 1000
      }
    },
    priceMark: {
      show: true,
      high: {
        show: true,
        color: COLORS.neutral_4,
        textOffset: 5,
        textSize: 10,
        textFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        textWeight: 'normal'
      },
      low: {
        show: true,
        color: COLORS.neutral_4,
        textOffset: 5,
        textSize: 10,
        textFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        textWeight: 'normal',
      },
      last: {
        show: true,
        upColor: COLORS.teal_5,
        downColor: COLORS.rose_5,
        noChangeColor: COLORS.neutral_4,
        line: {
          show: true,
          style: LineType.Dashed,
          dashedValue: [4, 4],
          size: 1
        },
        text: {
          show: true,
          style: PolygonType.Fill,
          size: 12,
          paddingLeft: 4,
          paddingTop: 4,
          paddingRight: 4,
          paddingBottom: 4,
          borderStyle: LineType.Solid,
          borderSize: 0,
          borderColor: 'transparent',
          borderDashedValue: [2, 2],
          color: COLORS.white,
          family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          weight: 'normal',
          borderRadius: 2
        }
      }
    },
    tooltip: {
      offsetLeft: 4,
      offsetTop: 6,
      offsetRight: 4,
      offsetBottom: 6,
      showRule: TooltipShowRule.Always,
      showType: TooltipShowType.Standard,
      custom: [
        {title: 'time', value: '{time}'},
        {title: 'open', value: '{open}'},
        {title: 'high', value: '{high}'},
        {title: 'low', value: '{low}'},
        {title: 'close', value: '{close}'},
        {title: 'volume', value: '{volume}'}
      ],
      defaultValue: 'n/a',
      rect: {
        position: CandleTooltipRectPosition.Fixed,
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 4,
        paddingBottom: 4,
        offsetLeft: 4,
        offsetTop: 4,
        offsetRight: 4,
        offsetBottom: 4,
        borderRadius: 4,
        borderSize: 1,
        borderColor: '#f2f3f5',
        color: '#FEFEFE'
      },
      text: {
        size: 12,
        family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        weight: 'normal',
        color: COLORS.neutral_4,
        marginLeft: 8,
        marginTop: 4,
        marginRight: 8,
        marginBottom: 4
      },
      icons: []
    }
  },
  indicator: {
    ohlc: {
      upColor: 'rgba(45, 192, 142, .7)',
      downColor: 'rgba(249, 40, 85, .7)',
      noChangeColor: COLORS.neutral_4
    },
    bars: [{
      style: PolygonType.Fill,
      borderStyle: LineType.Solid,
      borderSize: 1,
      borderDashedValue: [2, 2],
      upColor: 'rgba(45, 192, 142, .7)',
      downColor: 'rgba(249, 40, 85, .7)',
      noChangeColor: COLORS.neutral_4
    }],
    lines: [
      {
        style: LineType.Solid,
        smooth: false,
        size: 1,
        dashedValue: [2, 2],
        color: '#FF9600'
      }, {
        style: LineType.Solid,
        smooth: false,
        size: 1,
        dashedValue: [2, 2],
        color: '#935EBD'
      }, {
        style: LineType.Solid,
        smooth: false,
        size: 1,
        dashedValue: [2, 2],
        color: '#2196F3'
      }, {
        style: LineType.Solid,
        smooth: false,
        size: 1,
        dashedValue: [2, 2],
        color: '#E11D74'
      }, {
        style: LineType.Solid,
        smooth: false,
        size: 1,
        dashedValue: [2, 2],
        color: '#01C5C4'
      }
    ],
    circles: [{
      style: PolygonType.Fill,
      borderStyle: LineType.Solid,
      borderSize: 1,
      borderDashedValue: [2, 2],
      upColor: 'rgba(45, 192, 142, .7)',
      downColor: 'rgba(249, 40, 85, .7)',
      noChangeColor: COLORS.neutral_4
    }],
    lastValueMark: {
      show: false,
      text: {
        show: false,
        style: PolygonType.Fill,
        color: COLORS.white,
        size: 12,
        family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        weight: 'normal',
        borderStyle: LineType.Solid,
        borderSize: 1,
        borderDashedValue: [2, 2],
        paddingLeft: 4,
        paddingTop: 4,
        paddingRight: 4,
        paddingBottom: 4,
        borderRadius: 2,
        borderColor: ''
      }
    },
    tooltip: {
      offsetLeft: 4,
      offsetTop: 6,
      offsetRight: 4,
      offsetBottom: 6,
      showRule: TooltipShowRule.Always,
      showType: TooltipShowType.Standard,
      showName: true,
      showParams: true,
      defaultValue: 'n/a',
      text: {
        size: 12,
        family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        weight: 'normal',
        color: COLORS.neutral_4,
        marginTop: 4,
        marginRight: 8,
        marginBottom: 4,
        marginLeft: 8
      },
      icons: []
    }
  },
  xAxis: {
    show: true,
    size: 'auto',
    axisLine: {
      show: true,
      color: COLORS.neutral_4,
      size: 1
    },
    tickText: {
      show: true,
      color: COLORS.neutral_4,
      family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      weight: 'normal',
      size: 12,
      marginStart: 4,
      marginEnd: 4
    },
    tickLine: {
      show: true,
      size: 1,
      length: 3,
      color: COLORS.neutral_4
    }
  },
  yAxis: {
    show: true,
    size: 'auto',
    position: YAxisPosition.Right,
    type: YAxisType.Normal,
    inside: false,
    reverse: false,
    axisLine: {
      show: true,
      color: COLORS.neutral_4,
      size: 1
    },
    tickText: {
      show: true,
      color: COLORS.neutral_4,
      family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      weight: 'normal',
      size: 12,
      marginStart: 4,
      marginEnd: 4
    },
    tickLine: {
      show: true,
      size: 1,
      length: 3,
      color: COLORS.neutral_4
    }
  },
  separator: {
    size: 1,
    color: COLORS.neutral_4,
    fill: true,
    activeBackgroundColor: 'rgba(230, 230, 230, .15)'
  },
  crosshair: {
    show: true,
    horizontal: {
      show: true,
      line: {
        show: true,
        style: LineType.Dashed,
        dashedValue: [4, 2],
        size: 1,
        color: COLORS.neutral_4
      },
      text: {
        show: true,
        style: PolygonType.Fill,
        color: COLORS.white,
        size: 12,
        family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        weight: 'normal',
        borderStyle: LineType.Solid,
        borderDashedValue: [2, 2],
        borderSize: 1,
        borderColor: '#686D76',
        borderRadius: 2,
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: '#686D76'
      }
    },
    vertical: {
      show: true,
      line: {
        show: true,
        style: LineType.Dashed,
        dashedValue: [4, 2],
        size: 1,
        color: COLORS.neutral_4
      },
      text: {
        show: true,
        style: PolygonType.Fill,
        color: COLORS.white,
        size: 12,
        family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        weight: 'normal',
        borderStyle: LineType.Solid,
        borderDashedValue: [2, 2],
        borderSize: 1,
        borderColor: '#686D76',
        borderRadius: 2,
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: '#686D76'
      }
    }
  },
  overlay: {
    point: {
      color: '#1677FF',
      borderColor: 'rgba(22, 119, 255, 0.35)',
      borderSize: 1,
      radius: 5,
      activeColor: '#1677FF',
      activeBorderColor: 'rgba(22, 119, 255, 0.35)',
      activeBorderSize: 3,
      activeRadius: 5
    },
    line: {
      style: LineType.Solid,
      smooth: false,
      color: '#1677FF',
      size: 1,
      dashedValue: [2, 2]
    },
    rect: {
      style: PolygonType.Fill,
      color: 'rgba(22, 119, 255, 0.25)',
      borderColor: '#1677FF',
      borderSize: 1,
      borderRadius: 0,
      borderStyle: LineType.Solid,
      borderDashedValue: [2, 2]
    },
    polygon: {
      style: PolygonType.Fill,
      color: '#1677FF',
      borderColor: '#1677FF',
      borderSize: 1,
      borderStyle: LineType.Solid,
      borderDashedValue: [2, 2]
    },
    circle: {
      style: PolygonType.Fill,
      color: 'rgba(22, 119, 255, 0.25)',
      borderColor: '#1677FF',
      borderSize: 1,
      borderStyle: LineType.Solid,
      borderDashedValue: [2, 2]
    },
    arc: {
      style: LineType.Solid,
      color: '#1677FF',
      size: 1,
      dashedValue: [2, 2]
    },
    text: {
      style: PolygonType.Fill,
      color: COLORS.white,
      size: 12,
      family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      weight: 'normal',
      borderStyle: LineType.Solid,
      borderDashedValue: [2, 2],
      borderSize: 0,
      borderRadius: 2,
      borderColor: '#1677FF',
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      backgroundColor: 'transparent'
    },
    rectText: {
      style: PolygonType.Fill,
      color: COLORS.white,
      size: 12,
      family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      weight: 'normal',
      borderStyle: LineType.Solid,
      borderDashedValue: [2, 2],
      borderSize: 1,
      borderRadius: 2,
      borderColor: '#1677FF',
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 4,
      paddingBottom: 4,
      backgroundColor: '#1677FF'
    }
  }
}

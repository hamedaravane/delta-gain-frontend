import { CandleType, LineType, PolygonType, Styles, TooltipShowRule, TooltipShowType, YAxisPosition, YAxisType } from 'klinecharts';
enum CandleTooltipRectPosition {
  Fixed = "fixed",
  Pointer = "pointer"
}
export const defaultStyle: Styles = {
  grid: {
    show: true,
      horizontal: {
      show: true,
        size: 1,
        color: '#EDEDED',
        style: LineType.Dashed,
        dashedValue: [2, 2]
    },
    vertical: {
      show: true,
        size: 1,
        color: '#EDEDED',
        style: LineType.Dashed,
        dashedValue: [2, 2]
    }
  },
  candle: {
    type: CandleType.CandleSolid,
      bar: {
      upColor: '#2DC08E',
        downColor: '#F92855',
        noChangeColor: '#888888',
        upBorderColor: '#2DC08E',
        downBorderColor: '#F92855',
        noChangeBorderColor: '#888888',
        upWickColor: '#2DC08E',
        downWickColor: '#F92855',
        noChangeWickColor: '#888888'
    },
    area: {
      lineSize: 2,
        lineColor: '#2196F3',
        value: 'close',
        smooth: false,
        backgroundColor: [{
        offset: 0,
        color: 'rgba(33, 150, 243, 0.01)'
      }, {
        offset: 1,
        color: 'rgba(33, 150, 243, 0.2)'
      }],
        point: {
        show: true,
          color: 'blue',
          radius: 4,
          rippleColor: 'rgba(33, 150, 243, 0.2)',
          rippleRadius: 8,
          animation: true,
          animationDuration: 1000
      }
    },
    priceMark: {
      show: true,
        high: {
        show: true,
          color: '#D9D9D9',
          textOffset: 5,
          textSize: 10,
          textFamily: 'Helvetica Neue',
          textWeight: 'normal'
      },
      low: {
        show: true,
          color: '#D9D9D9',
          textOffset: 5,
          textSize: 10,
          textFamily: 'Helvetica Neue',
          textWeight: 'normal',
      },
      last: {
        show: true,
          upColor: '#2DC08E',
          downColor: '#F92855',
          noChangeColor: '#888888',
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
            color: '#FFFFFF',
            family: 'Helvetica Neue',
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
        { title: 'time', value: '{time}' },
        { title: 'open', value: '{open}' },
        { title: 'high', value: '{high}' },
        { title: 'low', value: '{low}' },
        { title: 'close', value: '{close}' },
        { title: 'volume', value: '{volume}' }
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
          family: 'Helvetica Neue',
          weight: 'normal',
          color: '#D9D9D9',
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
        noChangeColor: '#888888'
    },
    bars: [{
      style: PolygonType.Fill,
      borderStyle: LineType.Solid,
      borderSize: 1,
      borderDashedValue: [2, 2],
      upColor: 'rgba(45, 192, 142, .7)',
      downColor: 'rgba(249, 40, 85, .7)',
      noChangeColor: '#888888'
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
      noChangeColor: '#888888'
    }],
      lastValueMark: {
      show: false,
        text: {
          show: false,
          style: PolygonType.Fill,
          color: '#FFFFFF',
          size: 12,
          family: 'Helvetica Neue',
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
          family: 'Helvetica Neue',
          weight: 'normal',
          color: '#D9D9D9',
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
        color: '#888888',
        size: 1
    },
    tickText: {
      show: true,
        color: '#D9D9D9',
        family: 'Helvetica Neue',
        weight: 'normal',
        size: 12,
        marginStart: 4,
        marginEnd: 4
    },
    tickLine: {
      show: true,
        size: 1,
        length: 3,
        color: '#888888'
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
        color: '#888888',
        size: 1
    },
    tickText: {
      show: true,
        color: '#D9D9D9',
        family: 'Helvetica Neue',
        weight: 'normal',
        size: 12,
        marginStart: 4,
        marginEnd: 4
    },
    tickLine: {
      show: true,
        size: 1,
        length: 3,
        color: '#888888'
    }
  },
  separator: {
    size: 1,
      color: '#888888',
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
          color: '#888888'
      },
      text: {
        show: true,
          style: PolygonType.Fill,
          color: '#FFFFFF',
          size: 12,
          family: 'Helvetica Neue',
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
          color: '#888888'
      },
      text: {
        show: true,
          style: PolygonType.Fill,
          color: '#FFFFFF',
          size: 12,
          family: 'Helvetica Neue',
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
        color: '#FFFFFF',
        size: 12,
        family: 'Helvetica Neue',
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
        color: '#FFFFFF',
        size: 12,
        family: 'Helvetica Neue',
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

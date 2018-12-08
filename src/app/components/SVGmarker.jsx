import React from 'react'

const SVGmarker = ({ selectSensor, riverValue, sensorDescription, sensorId }) => (
  <svg 
    tabIndex="0" 
    onClick={() => selectSensor(sensorId)} 
    onKeyDown={(e) => e.key === 'Enter' && selectSensor(sensorId)}
    className='map-marker' 
    style={{ position: "absolute", top: "-60", left: "-30"}} 
    viewBox="0 0 286.515 286.515" 
    xmlns="http://www.w3.org/2000/svg"
    >
    <g className="layer">
      <title>{`Sensor at ${sensorDescription}, value: ${riverValue}`}</title>
      <rect fill="#ffffff" height="39" id="svg_24" stroke="#ffffff" strokeDasharray="null" strokeLinecap="null" strokeLinejoin="null" strokeWidth="5" width="174.00001" x="53.24999" y="119.5"/>
      <g id="svg_1">
        <g id="svg_2">
          <path d="m31.87346,142.61789c0.0619,0.64093 0.19947,1.28185 0.41958,1.90799c0.71633,1.98588 7.07285,19.61626 11.47103,27.08649c22.49104,42.90552 53.32742,79.62266 91.65819,109.15453c0.66916,0.77601 1.49259,1.4268 2.43295,1.92179c0.98065,0.51175 2.06349,0.77601 3.15812,0.81644c0.15722,0.00493 0.3164,0.00986 0.48443,0.00986c1.19486,0 2.41723,-0.2751 3.54036,-0.80559c0.89516,-0.4309 1.6842,-1.04126 2.33272,-1.77783c85.76251,-65.90784 102.48365,-134.98579 103.10171,-137.68754c2.53023,-9.67403 3.81745,-19.36975 3.81745,-28.82094c-0.00098,-62.54052 -50.70581,-113.42309 -113.03299,-113.42309c-62.32521,0 -113.03102,50.88652 -113.03102,113.42802c0,9.26581 1.22728,18.74658 3.64746,28.18987zm122.7019,-64.56584c0.10023,-0.10255 0.14936,-0.24059 0.25941,-0.33821c0.15918,-0.13509 0.35865,-0.17551 0.52373,-0.28792c0.29478,-0.19031 0.57385,-0.36286 0.88239,-0.49302c0.30952,-0.12325 0.61413,-0.2051 0.9384,-0.26524c0.31935,-0.06212 0.62887,-0.10255 0.95314,-0.10255s0.63379,0.04043 0.95314,0.10255c0.32426,0.06015 0.62887,0.13805 0.9384,0.26524c0.31935,0.13016 0.59841,0.29778 0.88239,0.49302c0.16999,0.11241 0.36455,0.15284 0.52373,0.28792c0.11005,0.09762 0.16017,0.23566 0.26531,0.33821c0.10416,0.10255 0.23878,0.15284 0.33409,0.26623c2.14603,2.53313 8.18812,3.68187 13.49718,3.90767c0.02948,0 0.05994,0.00493 0.09531,0.00493c1.75593,0.07297 3.43227,0.04043 4.85411,-0.0779c0.14051,-0.00986 0.26531,0.05226 0.39894,0.05226c5.06439,-0.31257 10.41865,-1.45737 12.42908,-3.85048c0.10023,-0.11241 0.23878,-0.16565 0.339,-0.2682s0.14936,-0.24059 0.26531,-0.33821c0.15918,-0.13213 0.35374,-0.17551 0.51292,-0.28792c0.29478,-0.19228 0.57974,-0.36286 0.8932,-0.49105c0.30461,-0.12325 0.61413,-0.2051 0.93348,-0.26722c0.32426,-0.06015 0.62887,-0.10255 0.95805,-0.10255s0.62887,0.0424 0.95314,0.10255c0.32426,0.06212 0.62396,0.14002 0.93348,0.26722c0.31837,0.1272 0.59841,0.29778 0.89221,0.49105c0.16508,0.11241 0.36455,0.15579 0.51391,0.28792c0.10907,0.09762 0.16508,0.23073 0.26924,0.33821c0.10023,0.10255 0.23878,0.15579 0.33409,0.2682c2.86923,3.40972 12.55387,4.31589 18.4466,3.84062c2.90362,-0.19524 5.26877,1.89517 5.48888,4.71129c0.22011,2.82402 -1.87581,5.28517 -4.68117,5.50999c-0.48345,0.03747 -1.87581,0.1272 -3.82237,0.1272c-4.91995,0 -13.31245,-0.66558 -19.3398,-4.36618c-6.01753,3.69962 -14.41592,4.36618 -19.33587,4.36618c-1.94066,0 -3.33696,-0.09565 -3.81745,-0.1272c-0.02948,0 -0.05994,-0.01972 -0.08942,-0.02465c-4.85116,-0.28792 -11.06718,-1.31242 -15.83777,-4.25081c-4.74995,2.92361 -10.92175,3.95303 -15.76702,4.24588c-0.05503,0.00493 -0.09728,0.04043 -0.15231,0.04832c-0.48148,0.03451 -1.87679,0.1272 -3.81745,0.1272c-4.91995,0 -13.32031,-0.66853 -19.3398,-4.36322c-6.01753,3.69469 -14.41789,4.36322 -19.34078,4.36322c-1.94066,0 -3.33597,-0.09762 -3.81451,-0.1272c-0.03243,0 -0.05797,-0.02268 -0.08745,-0.02761c-4.85509,-0.28792 -11.06226,-1.31636 -15.83482,-4.24884c-6.01753,3.7006 -14.41789,4.36618 -19.3398,4.36618c-1.94066,0 -3.33597,-0.09762 -3.81451,-0.1272c-2.81224,-0.2258 -4.90815,-2.68696 -4.6851,-5.51097c0.21912,-2.82106 2.74149,-4.93907 5.48593,-4.71327c5.91337,0.48809 15.58229,-0.424 18.44955,-3.83865c0.09728,-0.11537 0.23681,-0.16565 0.339,-0.26722c0.10219,-0.10255 0.15231,-0.24059 0.26432,-0.33821c0.16017,-0.13509 0.35178,-0.18045 0.52177,-0.28792c0.28692,-0.19031 0.57188,-0.35793 0.88239,-0.48809c0.30658,-0.12325 0.61413,-0.20312 0.93545,-0.26623c0.3223,-0.06015 0.62887,-0.10255 0.95608,-0.10255s0.63379,0.0424 0.95608,0.10255c0.32131,0.06212 0.62396,0.13805 0.93545,0.26623c0.3164,0.13016 0.59546,0.29778 0.88828,0.49302c0.16901,0.11241 0.36455,0.15481 0.52177,0.28792c0.11202,0.09762 0.1641,0.22975 0.26629,0.33821c0.10023,0.10255 0.23976,0.15284 0.33704,0.26722c2.06349,2.44834 7.64179,3.59707 12.81328,3.87612c0.00491,0 0.00491,0 0.00983,0c0.35964,0.02958 0.76644,0.03451 1.14966,0.05029c1.59871,0.04733 3.14142,0.02071 4.48072,-0.0848c0.12283,-0.0069 0.22502,0.04437 0.34195,0.04437c5.08404,-0.30764 10.4609,-1.44652 12.48411,-3.85048c0.09433,-0.11241 0.22895,-0.16467 0.33704,-0.2682c0.10219,-0.10255 0.14641,-0.23961 0.26432,-0.3323c0.16017,-0.13213 0.34686,-0.17256 0.51587,-0.28004c0.29675,-0.19524 0.58859,-0.37075 0.91088,-0.49795c0.2997,-0.11734 0.59153,-0.19524 0.90302,-0.25834c0.32623,-0.06015 0.63772,-0.10452 0.96984,-0.10452s0.64361,0.04043 0.97082,0.10452c0.31149,0.06212 0.60332,0.13509 0.90499,0.25834c0.32721,0.1272 0.61413,0.30271 0.90793,0.49795c0.16999,0.10748 0.35964,0.15284 0.51685,0.28004c0.11202,0.09762 0.15918,0.23073 0.26629,0.3323c0.10219,0.10255 0.23976,0.15579 0.33704,0.2682c2.00846,2.38819 7.32244,3.52312 12.36914,3.84555c0.16017,-0.00493 0.29675,-0.07198 0.45397,-0.05818c5.93793,0.47823 15.58818,-0.4309 18.4525,-3.83569c0.11595,-0.12227 0.25057,-0.17256 0.35571,-0.2751zm-96.94957,31.81455c5.94285,0.47133 15.58523,-0.4309 18.45152,-3.84062c0.09531,-0.11241 0.22993,-0.16565 0.33212,-0.2682s0.15231,-0.24059 0.26432,-0.33821c0.16017,-0.13213 0.35178,-0.17551 0.52668,-0.28792c0.29184,-0.19524 0.57876,-0.36286 0.8932,-0.49105c0.30658,-0.12325 0.60431,-0.20017 0.92071,-0.26327c0.3223,-0.06015 0.63379,-0.10748 0.96591,-0.10748c0.33114,0 0.6387,0.0424 0.96493,0.10748c0.3164,0.06212 0.61413,0.14002 0.9158,0.26327c0.3223,0.1272 0.60922,0.30271 0.90302,0.49598c0.16901,0.11438 0.36455,0.15481 0.52177,0.28792c0.11202,0.09762 0.1641,0.22975 0.26629,0.3323s0.23976,0.15579 0.33704,0.2682c2.06349,2.45524 7.64375,3.59707 12.81819,3.87513c0,0 0,0 0.00491,0c0.34883,0.02465 0.74089,0.02958 1.11035,0.05226c1.60952,0.04536 3.16893,0.02071 4.51609,-0.08776c0.11693,-0.00493 0.21912,0.04043 0.33114,0.04043c5.08503,-0.30764 10.47073,-1.44455 12.49393,-3.85048c0.09728,-0.11241 0.22993,-0.1627 0.33704,-0.26722c0.10219,-0.10058 0.14739,-0.24059 0.26432,-0.33328c0.16017,-0.13312 0.34883,-0.17256 0.51685,-0.28004c0.29675,-0.19524 0.58859,-0.37075 0.91088,-0.49894c0.30166,-0.11734 0.59153,-0.19524 0.90302,-0.25538c0.32721,-0.06212 0.6387,-0.10748 0.97082,-0.10748c0.33409,0 0.64361,0.04043 0.97279,0.10748c0.30854,0.06015 0.60136,0.13312 0.90302,0.25538c0.32721,0.12819 0.61413,0.3037 0.91088,0.49894c0.16704,0.10748 0.35669,0.15185 0.51391,0.28004c0.11202,0.09762 0.16017,0.23271 0.26727,0.33328c0.10219,0.10452 0.23976,0.15481 0.33704,0.26722c2.00748,2.38819 7.33226,3.52706 12.38486,3.84555c0.14936,0 0.28692,-0.06804 0.43333,-0.05818c1.46213,0.1203 3.15812,0.14988 4.917,0.08283c0.05011,-0.00493 0.10219,-0.00493 0.14739,-0.00493c5.3238,-0.21989 11.24699,-1.37454 13.38713,-3.91852c0.09531,-0.10945 0.23484,-0.1627 0.33507,-0.26524c0.10416,-0.10255 0.15427,-0.24059 0.26825,-0.33821c0.16017,-0.13312 0.34883,-0.17551 0.51882,-0.28792c0.28987,-0.19031 0.57385,-0.36286 0.88828,-0.49105c0.30461,-0.12523 0.60824,-0.2051 0.92759,-0.26722c0.32426,-0.06212 0.62887,-0.10255 0.95805,-0.10255s0.63477,0.04043 0.95903,0.10255c0.31837,0.06212 0.61806,0.13805 0.9325,0.26722c0.31444,0.12819 0.59841,0.29581 0.88239,0.49105c0.16999,0.11241 0.36455,0.15481 0.51882,0.28792c0.11497,0.09762 0.16999,0.23468 0.26924,0.33821c0.10023,0.10255 0.23976,0.15481 0.33998,0.26524c2.06545,2.45918 7.67421,3.60003 12.84767,3.87809c0.32426,0.02465 0.68881,0.03057 1.03371,0.04536c1.63605,0.05226 3.20823,0.02761 4.56522,-0.08776c0.12479,-0.00493 0.23484,0.04733 0.35472,0.04733c5.0693,-0.30764 10.45304,-1.45244 12.4733,-3.85048c0.09531,-0.11241 0.22895,-0.16467 0.33507,-0.26722c0.10416,-0.10255 0.15427,-0.24059 0.26432,-0.33821c0.16017,-0.13312 0.35374,-0.17256 0.51882,-0.28792c0.28889,-0.19228 0.56893,-0.36286 0.8873,-0.49105c0.30952,-0.12227 0.61413,-0.2051 0.9384,-0.26722c0.31935,-0.06015 0.62396,-0.10255 0.95314,-0.10255c0.32426,0 0.63477,0.0424 0.95314,0.10255c0.32426,0.06212 0.62396,0.141 0.9384,0.26722c0.31444,0.12819 0.59841,0.29877 0.88828,0.49105c0.16901,0.11537 0.35865,0.15481 0.51292,0.28792c0.11497,0.09762 0.16508,0.22975 0.26531,0.33821c0.10416,0.10255 0.23878,0.15481 0.339,0.26722c2.87513,3.41465 12.55387,4.31096 18.45152,3.84062c2.90461,-0.20017 5.26877,1.89517 5.48888,4.71129c0.22011,2.82402 -1.87581,5.28517 -4.69001,5.50999c-0.47853,0.03747 -1.87581,0.13016 -3.81156,0.13016c-4.91995,0 -13.31834,-0.66558 -19.34078,-4.36914c-6.01753,3.70258 -14.42084,4.36914 -19.3398,4.36914c-1.94164,0 -3.33794,-0.09762 -3.81745,-0.13016c-0.03046,0 -0.05601,-0.02071 -0.08549,-0.02465c-4.85411,-0.28595 -11.06718,-1.31735 -15.83678,-4.2518c-4.74504,2.92459 -10.91684,3.95599 -15.76702,4.24687c-0.05503,0.00493 -0.10219,0.0424 -0.15722,0.04733c-0.48148,0.0355 -1.87581,0.12819 -3.81745,0.12819c-4.91995,0 -13.32031,-0.66656 -19.3398,-4.36421c-6.01753,3.69765 -14.41789,4.36421 -19.33783,4.36421c-1.94361,0 -3.33794,-0.0986 -3.81745,-0.12819c-0.03243,0 -0.05699,-0.02169 -0.08745,-0.02761c-4.85411,-0.28595 -11.06718,-1.31242 -15.83482,-4.24293c-6.01753,3.69469 -14.41789,4.36322 -19.3398,4.36322c-1.94164,0 -3.33597,-0.09762 -3.81451,-0.13016c-2.81126,-0.2258 -4.90717,-2.68597 -4.6851,-5.50999c0.23091,-2.80923 2.75328,-4.87892 5.49772,-4.69946zm0,27.68699c5.94285,0.47034 15.58523,-0.42597 18.45152,-3.84062c0.09531,-0.11241 0.22993,-0.16467 0.33212,-0.26722c0.10219,-0.10255 0.15231,-0.24059 0.26432,-0.33821c0.16017,-0.13312 0.35178,-0.17256 0.52668,-0.28497c0.29184,-0.19524 0.57876,-0.36582 0.8932,-0.49302c0.30658,-0.12325 0.60431,-0.20017 0.92071,-0.26327c0.3223,-0.06015 0.63379,-0.10551 0.96591,-0.10551c0.33114,0 0.6387,0.04043 0.96493,0.10551c0.3164,0.06212 0.61413,0.14002 0.9158,0.26327c0.3223,0.1272 0.60922,0.30271 0.90302,0.49795c0.16901,0.11241 0.36455,0.15284 0.52177,0.28497c0.11202,0.0986 0.1641,0.23073 0.26629,0.33328c0.10219,0.10255 0.23976,0.15481 0.33704,0.26722c2.06349,2.45622 7.63884,3.60003 12.81328,3.87612l0.00491,0c0.35374,0.02465 0.75072,0.03451 1.13001,0.05226c1.60461,0.04437 3.15321,0.01972 4.50135,-0.08776c0.11693,-0.00986 0.21912,0.04043 0.33704,0.04043c5.08404,-0.30764 10.46582,-1.44455 12.48411,-3.84457c0.09728,-0.11241 0.23484,-0.1627 0.33704,-0.26623c0.10219,-0.10255 0.15231,-0.24059 0.26432,-0.33821c0.16017,-0.13509 0.35374,-0.17551 0.52177,-0.28792c0.29184,-0.19524 0.57385,-0.36582 0.89025,-0.49302c0.30461,-0.12325 0.60627,-0.2051 0.92857,-0.26623c0.32131,-0.06212 0.62887,-0.10255 0.96001,-0.10255c0.33212,0 0.63379,0.03944 0.95608,0.10255c0.3223,0.06113 0.62396,0.13805 0.93054,0.26623c0.31738,0.1272 0.59841,0.29778 0.88828,0.49302c0.16901,0.11241 0.36455,0.15284 0.52079,0.28792c0.11202,0.09762 0.16508,0.22975 0.26727,0.33821c0.10219,0.10255 0.23976,0.15284 0.33704,0.26623c1.99864,2.36255 7.3922,3.51227 12.42613,3.83569c0.13757,0 0.25941,-0.06113 0.39698,-0.05029c5.9173,0.47527 15.5872,-0.42597 18.45152,-3.84062c0.10023,-0.11241 0.23386,-0.16467 0.33998,-0.2682c0.10023,-0.10255 0.14936,-0.23961 0.25941,-0.33821c0.15918,-0.13213 0.35865,-0.17551 0.52373,-0.28792c0.29478,-0.18735 0.57385,-0.36286 0.88239,-0.49006c0.30952,-0.12325 0.61413,-0.2051 0.9384,-0.2682c0.31935,-0.06015 0.62887,-0.10255 0.95314,-0.10255s0.63379,0.0424 0.95314,0.10255c0.32426,0.06212 0.62887,0.14002 0.9384,0.2682c0.31935,0.1272 0.59841,0.29778 0.88239,0.49006c0.16999,0.11241 0.36455,0.15579 0.52373,0.28792c0.11005,0.0986 0.16017,0.23566 0.26531,0.33821c0.10416,0.10255 0.23878,0.15579 0.33409,0.2682c2.08609,2.47101 7.72334,3.60989 12.92333,3.88006c0.27906,0.02071 0.5935,0.02465 0.8873,0.04043c1.65767,0.05818 3.25442,0.02761 4.64088,-0.07987c0.1356,-0.01085 0.24958,0.04437 0.37929,0.05029c5.0693,-0.31257 10.42848,-1.45737 12.4448,-3.85541c0.10023,-0.11241 0.23878,-0.16565 0.339,-0.26623c0.10023,-0.10255 0.14936,-0.24257 0.26531,-0.34018c0.15918,-0.13312 0.35374,-0.17354 0.51292,-0.28595c0.29478,-0.19524 0.57974,-0.36483 0.8932,-0.49302c0.30461,-0.12227 0.61413,-0.2051 0.93348,-0.26524c0.32426,-0.06212 0.62887,-0.10255 0.95805,-0.10255s0.62887,0.04043 0.95314,0.10255c0.32426,0.06015 0.62396,0.13805 0.93348,0.26524c0.31837,0.12819 0.59841,0.29778 0.89221,0.49302c0.16508,0.11241 0.36455,0.15284 0.51391,0.28595c0.10907,0.09762 0.16508,0.22975 0.26924,0.34018c0.10023,0.10058 0.23878,0.15284 0.33409,0.26623c2.86923,3.40972 12.55387,4.32082 18.4466,3.84062c2.90362,-0.21003 5.26877,1.89813 5.48888,4.71129c0.22011,2.82402 -1.87581,5.28714 -4.68117,5.51294c-0.48345,0.0355 -1.87581,0.12523 -3.82237,0.12523c-4.91995,0 -13.31245,-0.66065 -19.3398,-4.36618c-6.01753,3.70553 -14.41592,4.36618 -19.33587,4.36618c-1.94066,0 -3.33696,-0.09565 -3.81745,-0.12523c-0.02948,0 -0.05994,-0.02071 -0.08942,-0.02465c-4.85116,-0.2899 -11.06718,-1.32228 -15.83187,-4.25081c-4.74504,2.91868 -10.91782,3.95007 -15.768,4.24095c-0.05503,0.00986 -0.10219,0.04536 -0.15722,0.05029c-0.48148,0.03451 -1.8817,0.13016 -3.83219,0.13016c-4.92289,0 -13.31048,-0.66065 -19.32506,-4.36618c-6.01261,3.70553 -14.40315,4.36618 -19.3231,4.36618c-1.95344,0 -3.35366,-0.10058 -3.83219,-0.13016c-0.03243,0 -0.05797,-0.02071 -0.08745,-0.02465c-4.85509,-0.28595 -11.06718,-1.31735 -15.83482,-4.24588c-6.01753,3.69567 -14.41789,4.36026 -19.3398,4.36026c-1.94066,0 -3.33597,-0.09466 -3.81451,-0.12523c-2.81224,-0.2258 -4.90815,-2.68893 -4.6851,-5.51196c0.23681,-2.81711 2.75918,-4.88977 5.50362,-4.70932z" fill="#001529" id="svg_3"/>
        </g>
      </g>
      <g id="svg_4"/>
      <g id="svg_5"/>
      <g id="svg_6"/>
      <g id="svg_7"/>
      <g id="svg_8"/>
      <g id="svg_9"/>
      <g id="svg_10"/>
      <g id="svg_11"/>
      <g id="svg_12"/>
      <g id="svg_13"/>
      <g id="svg_14"/>
      <g id="svg_15"/>
      <g id="svg_16"/>
      <g id="svg_17"/>
      <g id="svg_18"/>
      <rect fill="#001529" height="45" id="svg_19" stroke="#001529" strokeDasharray="null" strokeLinecap="null" strokeLinejoin="null" strokeWidth="5" width="182" x="52.5" y="76.5"/>
      <rect fill="#ffffff" height="58" id="svg_25" stroke="#ffffff" strokeDasharray="null" strokeLinecap="null" strokeLinejoin="null" strokeWidth="5" width="177" x="-524.75" y="-254.5"/>
      <rect fill="#ffffff" height="0" id="svg_26" stroke="#ffffff" strokeDasharray="null" strokeLinecap="null" strokeLinejoin="null" strokeWidth="5" width="1" x="-467.75" y="-234.5"/>
      <text style={{ "textAnchor": "middle" }} x="140" y="110" fontSize="60" fill="white" >{riverValue}</text>
    </g>
  </svg>
  
) 

export default SVGmarker

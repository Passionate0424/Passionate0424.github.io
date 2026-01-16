
### **国家级大创《谱写未来——小型化拉曼光谱仪用于实时分子检测》 负责人**  
**2024年11月 – 2025年11月**  

负责小组成员任务安排、前期调研、小型化高准确性光谱仪方案设计、双通道光谱仪ZEMAX仿真设计与优化、COMSOL器件仿真设计与优化、光路实验搭建。

#### 主要贡献:  
- ZEMAX成功仿真双通道光谱仪光路设计，验证方案设计的可行性。  
- 调研探索设计《内置参考光路的光纤式拉曼光谱仪系统设计》方案，小型化同时保持极高检测准确度，申请发明专利（2025年6月公开）。
- COMSOL中搭建了器件模型，进行仿真性能分析与优化，设计了基于等离激元增强和光镊效应的片上拉曼增强器件，提高纳米级微粒的检测灵敏度，具有较低检出限，并具有一定尺寸分选作用。  
- 搭建了包含小波去噪、自适应迭代重加权惩罚最小二乘法等光谱处理matlab算法平台。

---

### **National Undergraduate Training Program for Innovation and Entrepreneurship - "Composing the Future: Miniaturized Raman Spectrometer for Real-time Molecular Detection" - Project Leader**
**November 2024 – November 2025**

Responsible for team member task assignment, preliminary research, design of miniaturized high-accuracy spectrometer schemes, ZEMAX simulation design and optimization of dual-channel spectrometers, COMSOL device simulation design and optimization, and optical path experimental setup.

#### Key Contributions:
- Successfully simulated dual-channel spectrometer optical path design using ZEMAX, verifying the feasibility of the scheme design.
- Investigated and designed the "Fiber-optic Raman Spectrometer System with Built-in Reference Optical Path" scheme, achieving miniaturization while maintaining extremely high detection accuracy. Applied for a patent (to be published in June 2025).
- Built device models in COMSOL for simulation performance analysis and optimization. Designed on-chip Raman enhancement devices based on plasmon enhancement and optical tweezers effects, improving detection sensitivity for nanoscale particles with lower detection limits and certain size sorting capabilities.
- Built a spectral processing MATLAB algorithm platform including wavelet denoising and adaptive iteratively reweighted penalized least squares methods.

---

### **2025年全国大学生嵌入式芯片与系统设计竞赛（应用赛道） —— 基于PSoC6的多模健康监测台灯系统 | 国家二等奖 | 团队队长**
**2025年03月 – 2025年08月**

负责团队成员任务安排、项目方案构思设计、代码实现、元器件选型、作品集成与调试。

#### 主要贡献：
- 负责多模态感知系统的硬件集成与驱动编写，通过 I2C/UART 总线集成 **ENS160 (空气质量)、BMP280 (气压)、BH1750 (光强)、SHT31 (温湿度)、R60ABD1（毫米波雷达）** 传感器阵列，构建全维环境感知体系。
- 自主开发 RT-Thread ST7789 驱动软件包：针对社区现有驱动功能不足的问题，独立开发并封装了 **R60ABD1 毫米波雷达** 与 **ST7789V 显示屏 (SPI 适配)** 的驱动软件包。填补了现有生态 ST7789 驱动不适配 LVGL 图形界面中的批量刷屏接口的缺陷，实现了非接触式心率呼吸监测与高效图形显示，并将软件包贡献至 RT-Thread 开源社区 (https://github.com/RT-Thread/packages/tree/master/peripherals/ST7789_SPI) (https://github.com/Passionate0424/RT-Thread-ST7789-Package)。
- 基于 **RT-Thread** 实时操作系统搭建软件架构，设计 **PSoC6** 主控与 **SG2002** 算力板之间的 UART 通信协议，确保多源异构数据的高效同步。
- 深度底层优化：在开发过程中定位并修复了 PSoC6 官方 BSP 中的 UART 中断配置错误导致的 **HardFault** 问题，并提交 PR 被官方仓库合并，显著提升了系统长期运行的稳定性 (https://github.com/RT-Thread/rt-thread/pull/10225、https://github.com/RT-Thread-Studio/sdk-bsp-cy8c624-infineon-evaluationkit/pull/13、https://github.com/RT-Thread/rt-thread/pull/10260、https://github.com/RT-Thread/rt-thread/pull/10231)。
- 在资源受限的 MCU 端（PSoC6）部署 **轻量化 FCNN** 与 **LSTM** 神经网络。使用 **TensorFlow** 训练并配合 **nnom** 工具进行 Int8 量化部署，实现环境评分（推理耗时 **891μs**）与温湿度时序预测（推理耗时 **1.7ms**），大幅降低算力消耗。
- 在 Linux 端 (SG2002) 部署 **YOLOv5** 与 **YOLOv8-pose** 模型，实现手部动作捕捉与人体姿态识别，准确率满足实时交互需求。
- 设计 **PID 闭环控制算法** 结合 **卡尔曼滤波** 处理视觉坐标数据，驱动二维舵机云台实现"光随书动"的高精度自动追踪。
- 集成 **Deepseek 大模型** API 实现自然语言环境评估建议，并基于 **ThingsPanel** 物联网平台与 **RTMP/SRS** 流媒体服务，实现了数据的远程 MQTT 上云与视频流实时监控。
- **项目开源仓库**：`https://github.com/Passionate0424/PSoC6_Lamp`

---

### **2025 National Undergraduate Embedded Chip and System Design Competition (Application Track) — PSoC6-Based Multi-Modal Health Monitoring Desk Lamp System | National Second Prize | Team Leader**
**March 2025 – August 2025**

Responsible for team member task assignment, project scheme conceptual design, code implementation, component selection, and work integration and debugging.

#### Key Contributions:
- Responsible for hardware integration and driver development of multi-modal perception systems. Integrated **ENS160 (air quality), BMP280 (air pressure), BH1750 (light intensity), SHT31 (temperature and humidity), R60ABD1 (millimeter-wave radar)** sensor arrays through I2C/UART buses to build a comprehensive environmental perception system.
- Independently developed RT-Thread ST7789 driver software package: Addressing the insufficient functionality of existing community drivers, independently developed and packaged driver software packages for **R60ABD1 millimeter-wave radar** and **ST7789V display (SPI adapter)**. Filled the gap in existing ecosystem ST7789 drivers that did not support batch screen refresh interfaces in LVGL graphics interfaces, achieving non-contact heart rate and respiration monitoring and efficient graphics display, and contributed the software package to the RT-Thread open source community (https://github.com/RT-Thread/packages/tree/master/peripherals/ST7789_SPI) (https://github.com/Passionate0424/RT-Thread-ST7789-Package).
- Built software architecture based on **RT-Thread** real-time operating system, designed UART communication protocol between **PSoC6** main controller and **SG2002** computing board to ensure efficient synchronization of multi-source heterogeneous data.
- Deep low-level optimization: During development, located and fixed the **HardFault** issue caused by UART interrupt configuration errors in PSoC6 official BSP, submitted PR which was merged into official repository, significantly improving system long-term stability (https://github.com/RT-Thread/rt-thread/pull/10225、https://github.com/RT-Thread-Studio/sdk-bsp-cy8c624-infineon-evaluationkit/pull/13、https://github.com/RT-Thread/rt-thread/pull/10260、https://github.com/RT-Thread/rt-thread/pull/10231).
- Deployed **lightweight FCNN** and **LSTM** neural networks on resource-constrained MCU end (PSoC6). Used **TensorFlow** for training and **nnom** tool for Int8 quantization deployment, achieving environmental scoring (inference time **891μs**) and temperature-humidity time series prediction (inference time **1.7ms**), greatly reducing computing power consumption.
- Deployed **YOLOv5** and **YOLOv8-pose** models on Linux end (SG2002), achieving hand motion capture and human pose recognition with accuracy meeting real-time interaction requirements.
- Designed **PID closed-loop control algorithm** combined with **Kalman filter** to process visual coordinate data, driving 2D servo gimbal to achieve high-precision automatic tracking of "light following book movement".
- Integrated **Deepseek large model** API to implement natural language environmental assessment suggestions, and based on **ThingsPanel** IoT platform and **RTMP/SRS** streaming media service, implemented remote MQTT cloud upload of data and real-time video stream monitoring.
- **Project Open Source Repository**: `https://github.com/Passionate0424/PSoC6_Lamp`

---

### **2025年全国大学生FPGA创新设计竞赛 —— 基于易灵思Ti60F225的内窥镜ISP设计 | 团队队长**
**2025年06月 – 2025年10月**

基于 **Efinix (易灵思) Ti60F225** 平台，针对医疗内窥镜弱光、高噪声、雾气干扰及色彩失真等痛点，设计并实现了一套高实时性、低延迟的 **ISP (图像信号处理)** 系统。

负责顶层架构设计、参考代码调研、CLAHE算法设计、模块之间连接、STM32图形界面设计、UART通信模块与指令设计、团队成员任务安排等

#### 主要贡献：
- **全流水线 ISP 架构设计**：设计了从 Bayer Raw 数据输入到 YUV 输出的全链路 RTL 设计。系统集成了 **BNR (Bayer降噪)**、**DPC (坏点校正)**、**AWB (自动白平衡)**、**AE (自动曝光)**、**CCM (色彩校正)**、**Gamma 校正** 、**CLAHE**、**去雾**等核心模块，支持 **1280×720** 分辨率实时处理，全系统处理延迟低至 **1.02μs**。
- **复杂算法硬件化与资源优化**：
 - **CLAHE 算法硬件加速与架构创新** \[[GitHub开源](https://github.com/Passionate0424/CLAHE_verilog) | [技术博客](https://blog.csdn.net/qq_60796105/article/details/156876723?fromshare=blogdetail&sharetype=blogdetail&sharerId=156876723&sharerefer=PC&sharesource=&sharefrom=from_link)\]
    - **并行流水线架构**：设计 **16 Tiles (4×4)** 分块并行处理架构，利用 **32块伪双端口 RAM** 构建乒乓缓存 (Ping-Pong Buffer)，实现直方图统计与像素映射的无气泡流水线。
    - **流水线冒险消除**：针对直方图统计中的 **RAW (Read-After-Write)** 冒险，创新设计 **旁路逻辑 (Bypass Logic)** 与数据前瞻机制，在不暂停流水线的前提下解决了连续像素累加冲突。
    - **资源与算力优化**：利用比较器链替代除法器进行坐标计算，使用移位替代乘除法，显著降低硬件资源消耗。
    - **底层网表级调试**：在调试过程中，深入分析 **综合网表 (Synthesized Netlist)**，成功定位了 Efinity 综合器在相似逻辑路径合并上的 Bug (导致并行索引信号错误连接)，展现了扎实的底层 Debug 能力；同时利用比较器链替代除法器进行坐标计算，显著优化了逻辑资源。
- **可视化设计与系统优化集成**：通过移位替代乘除法优化硬件消耗，确保了系统在小型化硬件约束下的稳定运行。配合 STM32 上位机与 LVGL GUI，并设计了UART指令，通过图形界面实现算法模块的开关和参数调节，实现了对胃肠镜、腹腔镜等不同设备成像需求的动态适配。

---

### **2025 National Undergraduate FPGA Innovation Design Competition — Efinix Ti60F225-Based Endoscope ISP Design | Team Leader**
**June 2025 – October 2025**

Based on the **Efinix Ti60F225** platform, designed and implemented a high real-time, low-latency **ISP (Image Signal Processing)** system addressing pain points such as low light, high noise, fog interference, and color distortion in medical endoscopes.

Responsible for top-level architecture design, reference code research, CLAHE algorithm design, module interconnection, STM32 graphical interface design, UART communication module and instruction design, and team member task assignment.

#### Key Contributions:
- **Full Pipeline ISP Architecture Design**: Designed full-link RTL design from Bayer Raw data input to YUV output. The system integrated core modules including **BNR (Bayer Noise Reduction)**, **DPC (Defective Pixel Correction)**, **AWB (Auto White Balance)**, **AE (Auto Exposure)**, **CCM (Color Correction Matrix)**, **Gamma Correction**, **CLAHE**, **Defogging**, supporting real-time processing at **1280×720** resolution with full system processing latency as low as **1.02μs**.
- **Complex Algorithm Hardware Implementation and Resource Optimization**:
    - **CLAHE Algorithm Hardware Acceleration and Architecture Innovation** \[[GitHub Open Source](https://github.com/Passionate0424/CLAHE_verilog) | [Technical Blog](https://blog.csdn.net/qq_60796105/article/details/156876723?fromshare=blogdetail&sharetype=blogdetail&sharerId=156876723&sharerefer=PC&sharesource=&sharefrom=from_link)\]
    - **Parallel Pipeline Architecture**: Designed **16 Tiles (4×4)** block parallel processing architecture, utilizing **32 pseudo dual-port RAMs** to build ping-pong buffers, achieving bubble-free pipeline for histogram statistics and pixel mapping.
    - **Pipeline Hazard Elimination**: For **RAW (Read-After-Write)** hazards in histogram statistics, innovatively designed **bypass logic** and data lookahead mechanism, solving continuous pixel accumulation conflicts without pausing the pipeline.
    - **Resource and Computing Power Optimization**: Used comparator chains to replace dividers for coordinate calculation, used bit shifts to replace multiplication/division, significantly reducing hardware resource consumption.
    - **Low-level Netlist-level Debugging**: During debugging, deeply analyzed **synthesized netlist**, successfully located Efinity synthesizer bug in similar logic path merging (causing incorrect connection of parallel index signals), demonstrating solid low-level debugging capabilities; meanwhile used comparator chains to replace dividers for coordinate calculation, significantly optimizing logic resources.
- **Visualization Design and System Optimization Integration**: Optimized hardware consumption by replacing multiplication/division with bit shifts, ensuring stable system operation under miniaturized hardware constraints. Cooperated with STM32 host computer and LVGL GUI, designed UART instructions, achieving dynamic adaptation to imaging requirements of different equipment such as gastroscopes and laparoscopes through graphical interface for algorithm module switching and parameter adjustment.

---

### **基于 VLSI DSP 理论的 CLAHE 硬件架构深度优化**
**2025年10月 – 2026年01月 | 个人项目 (基于课程研究)**

针对竞赛版本在扩展至高分辨率（64-Tile）时存在的资源消耗激增及时序收敛困难（Fmax < 28MHz）等问题，应用《VLSI Digital Signal Processing Systems》课程中的核心设计方法学，对 CLAHE 加速器进行了系统级重构。在 Xilinx 7 系列 FPGA 上实现了 **188MHz** 的工作频率（提升 6.7 倍），并将 BRAM 资源消耗降低了 **72.7%**。

#### 核心技术实现：
- **深流水线与割集重定时 (Deep Pipelining & Cut-Set Retiming)**：
  - 针对 CDF 归一化计算中 32-bit 除法器导致的深组合逻辑路径（185 级 Logic Levels，延迟 35.5ns），采用 **割集流水线 (Cut-Set Pipelining)** 技术将其拆解为 **33级** 细粒度流水线。
  - 配合 **割集重定时 (Cut-Set Retiming)** 技术，在控制路径插入延迟寄存器链以解决深流水线带来的数据与地址失配问题，成功将关键路径延迟降低至 **5.3ns** 以下，消除时序违例。

- **硬件折叠与棋盘式交织存储 (Hardware Folding & Checkerboard Interleaving)**：
  - 为解决 64-Tile 分块带来的巨大存储资源开销（直接映射需消耗大量 BRAM），利用 **硬件折叠 (Folding)** 技术（折叠因子 N=16），将 64 个逻辑 Tile 映射至 **4个物理 RAM Bank**。
  - 创新设计 **棋盘式交织 (Checkerboard Interleaving)** 存储架构，构建 Bank_ID(x,y)={y[0],x[0]} 映射逻辑，确保了双线性插值过程中对任意 2x2 邻域的 4 个 Tile 数据访问无冲突并行读取。

- **算法强度缩减 (Algorithmic Strength Reduction)**：
  - 针对双线性插值模块，通过代数变换将原始公式优化为 V_interp=A+(w_x*(B-A))/256，将"2乘1加"简化为 **"1减1乘1移位"**，大幅降低运算复杂度。
  - 使用 **LUT 查找表** 替代权重计算中的除法运算，完全消除了关键路径上的除法器瓶颈。

#### 优化成果量化对比 (Optimization Results)：
| 性能指标 (Metrics) | Baseline (64-Tile) | Optimized (64-Tile) | 优化效果 (Improvement) |
| :--- | :--- | :--- | :--- |
| **最高工作频率 (Fmax)** | ~28 MHz | **~188 MHz** | **提升 6.7 倍** |
| **关键路径延迟 (Delay)** | 35.5 ns (185 Logic Levels) | **5.30 ns (6 Logic Levels)** | **消除时序违例 (WNS +4.7ns)** |
| **BRAM 资源消耗** | 66 Tiles | **18 Tiles** | **节省 72.7%** |
| **LUT 逻辑资源** | 8,014 | **3,738** | **节省 53.4%** |

---

### **Deep Optimization of CLAHE Hardware Architecture Based on VLSI DSP Theory**
**October 2025 – January 2026 | Personal Project (Based on Course Research)**

Addressing issues of dramatically increased resource consumption and timing convergence difficulties (Fmax < 28MHz) when extending the competition version to high resolution (64-Tile), applied core design methodologies from the "VLSI Digital Signal Processing Systems" course to systematically reconstruct the CLAHE accelerator. Achieved **188MHz** operating frequency (6.7x improvement) on Xilinx 7-series FPGA and reduced BRAM resource consumption by **72.7%**.

#### Core Technical Implementation:
- **Deep Pipelining & Cut-Set Retiming**:
  - For deep combinational logic paths (185 Logic Levels, 35.5ns delay) caused by 32-bit dividers in CDF normalization calculation, used **Cut-Set Pipelining** technique to decompose into **33-stage** fine-grained pipelines.
  - Combined with **Cut-Set Retiming** technique, inserted delay register chains in control paths to solve data and address mismatch issues caused by deep pipelines, successfully reducing critical path delay to below **5.3ns**, eliminating timing violations.

- **Hardware Folding & Checkerboard Interleaving**:
  - To address huge storage resource overhead caused by 64-Tile blocking (direct mapping would consume large amounts of BRAM), used **Hardware Folding** technique (folding factor N=16) to map 64 logical Tiles to **4 physical RAM Banks**.
  - Innovatively designed **Checkerboard Interleaving** storage architecture, constructing Bank_ID(x,y)={y[0],x[0]} mapping logic, ensuring conflict-free parallel reading of 4 Tile data for any 2x2 neighborhood during bilinear interpolation.

- **Algorithmic Strength Reduction**:
  - For bilinear interpolation module, optimized original formula through algebraic transformation to V_interp=A+(w_x*(B-A))/256, simplifying "2 multiplications 1 addition" to **"1 subtraction 1 multiplication 1 shift"**, greatly reducing computational complexity.
  - Used **LUT lookup table** to replace division operations in weight calculation, completely eliminating divider bottlenecks on critical paths.

#### Optimization Results Quantitative Comparison:
| Metrics | Baseline (64-Tile) | Optimized (64-Tile) | Improvement |
| :--- | :--- | :--- | :--- |
| **Maximum Operating Frequency (Fmax)** | ~28 MHz | **~188 MHz** | **6.7x Improvement** |
| **Critical Path Delay** | 35.5 ns (185 Logic Levels) | **5.30 ns (6 Logic Levels)** | **Timing Violation Eliminated (WNS +4.7ns)** |
| **BRAM Resource Consumption** | 66 Tiles | **18 Tiles** | **72.7% Saved** |
| **LUT Logic Resources** | 8,014 | **3,738** | **53.4% Saved** |

# HDLBits 题解记录


<!--more-->

> 我的HDLBits刷题记录和一些debug记录见此：[weekly-report/记录/HDLBits.md at main · Salvely/weekly-report](https://github.com/Salvely/weekly-report/blob/main/%E8%AE%B0%E5%BD%95/HDLBits.md)

## Adder100i

```verilog
module fadd( 
    input a, b, cin,
    output cout, sum );
	assign sum = a ^ b ^ cin;
    assign cout = (a & b) | ((a | b) & cin);
endmodule

module top_module( 
    input [99:0] a, b,
    input cin,
    output [99:0] cout,
    output [99:0] sum );
    
    genvar i;
    fadd adder0(.a(a[0]),.b(b[0]),.cin(cin),.cout(cout[0]),.sum(sum[0]));
    generate
        for(i = 1; i < 100; i++) begin: adder_block
            fadd adder_i(.a(a[i]),.b(b[i]),.cin(cout[i-1]),.cout(cout[i]),.sum(sum[i]));
        end
    endgenerate
endmodule
```

## Bcdadd100

```verilog
module top_module( 
    input [399:0] a, b,
    input cin,
    output cout,
    output [399:0] sum );
    wire[100:0] cout_arr;
    genvar i;
    bcd_fadd adder0(.a(a[3:0]),.b(b[3:0]),.cin(cin),.cout(cout_arr[0]),.sum(sum[3:0]));
    generate
        for(i = 1; i < 100; i++) begin: bcd_adder
            bcd_fadd(.a(a[3 + 4 * i:4 * i]),.b(b[3 + 4 * i:4 * i]),.cin(cout_arr[i-1]),.sum(sum[3 + 4 * i:4 * i]),.cout(cout_arr[i]));
        end
        assign cout = cout_arr[99];
    endgenerate
endmodule
```

## Mux256to1

```verilog
module top_module( 
    input [255:0] in,
    input [7:0] sel,
    output out );
    assign out = in[sel];
endmodule
```

## Mux256to1v

```verilog
module top_module( 
    input [1023:0] in,
    input [7:0] sel,
    output [3:0] out );
    assign out = in[4 * sel +: 4];
endmodule
```

## Fadd

```verilog
module top_module( 
    input a, b, cin,
    output cout, sum );
	assign sum = a ^ b ^ cin;
    assign cout = (a & b) | ((a | b) & cin);
endmodule
```

## Exams/m2014 q4j

```verilog
module fadd( 
    input a, b, cin,
    output cout, sum );
	assign sum = a ^ b ^ cin;
    assign cout = (a & b) | ((a | b) & cin);
endmodule

module top_module (
    input [3:0] x,
    input [3:0] y, 
    output [4:0] sum);
    wire [3:0] cout;
    fadd adder0(.a(x[0]),.b(y[0]),.cin(0),.cout(cout[0]),.sum(sum[0]));
    fadd adder1(.a(x[1]),.b(y[1]),.cin(cout[0]),.cout(cout[1]),.sum(sum[1]));
    fadd adder2(.a(x[2]),.b(y[2]),.cin(cout[1]),.cout(cout[2]),.sum(sum[2]));
    fadd adder3(.a(x[3]),.b(y[3]),.cin(cout[2]),.cout(cout[3]),.sum(sum[3]));
    assign sum[4] = cout[3];
endmodule
```

## Exams/ece241 2014 q1c

```verilog
module fadd( 
    input a, b, cin,
    output cout, sum );
	assign sum = a ^ b ^ cin;
    assign cout = (a & b) | ((a | b) & cin);
endmodule

module top_module (
    input [7:0] a,
    input [7:0] b,
    output [7:0] s,
    output overflow
); //
 
    // assign s = ...
    // assign overflow = ...
	generate
        wire [7:0] cout;
        fadd adderi(.a(a[0]),.b(b[0]),.cin(0),.cout(cout[0]),.sum(s[0]));
        genvar i;
        for(i =  1; i < 8; i++) begin: add_block
            fadd adderi(.a(a[i]),.b(b[i]),.cin(cout[i-1]),.cout(cout[i]),.sum(s[i]));
        end
        assign overflow = ~(a[7] ^ b[7]) && (s[7] ^ b[7]);
    endgenerate
endmodule
```

## Adder100

```verilog
module top_module( 
    input [99:0] a, b,
    input cin,
    output cout,
    output [99:0] sum );
    assign {cout,sum} = a + b + cin;
endmodule
```

## Dff8r

```verilog
module top_module (
    input clk,
    input reset,            // Synchronous reset
    input [7:0] d,
    output [7:0] q
);
    always @(posedge clk) begin
        if(reset == 1) q <= 8'h00;
        else q <= d;
    end
endmodule
```

## Exams/ece241 2014 q4

```verilog
module dffr(input clk, input reset, input d, output q, output notq);
    always @(posedge clk, posedge reset) begin
        if(reset) q <= 1'b0;
        else q <= d;
    	notq = ~q;
    end
endmodule

module top_module (
    input clk,
    input x,
    output z
); 
    wire d_in0;
    wire d_in1;
    wire d_in2;
    wire q_out0;
    wire notq_out0;
    wire q_out1;
    wire notq_out1;
    wire q_out2;
    wire notq_out2;
    
    assign d_in0 = x ^ q_out0;
    assign d_in1 = x & notq_out1;
    assign d_in2 = x | notq_out2;
    dffr(clk,d_in0,q_out0,notq_out0);
    dffr(clk,d_in1,q_out1,notq_out1);
    dffr(clk,d_in2,q_out2,notq_out2);
    assign z = ~(q_out0 | q_out1 | q_out2);
endmodule
```

## Exams/ece241 2013 q7

```verilog
module top_module (
    input clk,
    input j,
    input k,
    output Q);
    always @(posedge clk) begin	
        case({j,k})
            2'b00: Q <= Q;
            2'b01: Q <= 0;
            2'b10: Q <= 1;
            2'b11: Q <= ~Q;
        endcase
    end
endmodule
```

## Edgedetect2

```verilog
module top_module (
    input clk,
    input [7:0] in,
    output [7:0] anyedge
);
    wire [7:0] pre_in;
    always @(posedge clk) begin
        integer i;
        for(i = 0; i < 8; i++) begin
            if(in[i] == ~pre_in[i]) anyedge[i] = 1;
            else anyedge[i] = 0;
        end
       	pre_in <= in;
    end
endmodule
```

## Edgecapture

```verilog
module capture_dff(input clk, input [31:0] capture_arr, output [31:0] capture_sig);
    always @(posedge clk) begin
        capture_sig <= capture_arr;
    end
endmodule

module dff_out(input clk, input [31:0] capture_sig, output [31:0] out);
    always @(posedge clk) begin
        out <= capture_sig;
    end
endmodule

module top_module (
    input clk,
    input reset,
    input [31:0] in,
    output [31:0] out
);
    wire [31:0] capture;
    wire [31:0] capture_sig;
    wire [31:0] pre_in;
    
    always @(posedge clk) begin
        integer i;
        for(i = 0; i < 32; i++) begin
            if(reset == 1) capture[i] = 0;
            else begin
                if(in[i] == 0 && pre_in[i] == 1) begin
                    capture[i] = 1;
                end
            end
            pre_in <= in;
            out <= capture;
        end
    end
endmodule
```

## Dualedge

```verilog
module pos_dff(input clk, input d, output q);
    always @(posedge clk) begin
    	q <= d;
    end
endmodule

module neg_dff(input clk, input d, output q);
    always @(negedge clk) begin
    	q <= d;
    end
endmodule

module mux_clk(input sel, input d0, input d1, output q);
    always @(*) begin
        if(sel == 1'b0) q = d0;
        else q = d1;
    end
endmodule

module top_module (
    input clk,
    input d,
    output q
);
    wire out1;
    wire out2;
    pos_dff(clk,d,out1);
    neg_dff(clk,d,out2);
    mux_clk(clk,out2,out1,q);
endmodule
```

## Exams/ece241 2014 q7a

```verilog
module top_module (
    input clk,
    input reset,
    input enable,
    output [3:0] Q,
    output c_enable,
    output c_load,
    output [3:0] c_d
); //

    count4 the_counter (clk, c_enable, c_load, c_d, Q);
    assign c_enable = enable;
    assign c_load = (enable && (Q == 4'd12)) || (reset == 1);
    assign c_d = 4'd1;
endmodule
```

## Count10

```verilog
module top_module (
    input clk,
    input reset,        // Synchronous active-high reset
    output [3:0] q);
    always @(posedge clk) begin
        if(reset == 1 || q == 4'd9) q <= 4'd0;
        else q++;
    end
endmodule
```

## Countbcd

```verilog
module bcd_counter (
    input clk,
    input reset,        // Synchronous active-high reset
    input enable,
    output [3:0] q);
    always @(posedge clk) begin
        if(reset == 1) q <= 4'd0;
        else begin
            if(enable == 1) begin
                if(q == 4'd9) q <= 4'd0;
                else q++;        	
            end
        end
    end
endmodule

module top_module (
    input clk,
    input reset,   // Synchronous active-high reset
    output [3:1] ena,
    output [15:0] q);

    assign ena[1] = (q[3:0] == 4'h9);
    assign ena[2] = (q[7:0] == 8'h99);
    assign ena[3] = (q[11:0] == 12'h999);
    bcd_counter counter0(clk,reset,q[3:0]);
    bcd_counter counter1(clk,reset,ena[1],q[7:4]);
    bcd_counter counter2(clk,reset,ena[2],q[11:8]);
    bcd_counter counter3(clk,reset,ena[3],q[15:12]);
endmodule
```

## Count clock

```verilog
module top_module(
    input clk,
    input reset,
    input ena,
    output pm,
    output [7:0] hh,
    output [7:0] mm,
    output [7:0] ss); 
    
    always @(posedge clk) begin
        if(reset == 1) begin
            {hh,mm,ss,pm} = {8'h12,8'h0,8'h0,1'b0};
        end
        else begin
            if(ena == 1) begin
                case({hh,mm,ss,pm})
                    {8'h11,8'h59,8'h59,1'b0}: {hh,mm,ss,pm} <= {8'h12,8'h0,8'h0,1'b1};
                    {8'h12,8'h59,8'h59,1'b1}: {hh,mm,ss,pm} <= {8'h1,8'h0,8'h0,1'b1};
                    {8'h11,8'h59,8'h59,1'b1}: {hh,mm,ss,pm} <= {8'h12,8'h0,8'h0,1'b0};
                    {8'h12,8'h59,8'h59,1'b0}: {hh,mm,ss,pm} <= {8'h1,8'h0,8'h0,1'b0};
                    default:
                        begin
                            if({mm,ss} == {8'h59,8'h59}) begin
                                if(hh == 8'h09) hh <= 8'h10;
                                else hh++;
                                {mm,ss} <= {8'h00,8'h00};
                            end
                            else begin
                                if(ss == 8'h59) begin
                                    if(mm[3:0] == 4'h9) begin
                                        mm[3:0] <= 4'h0;
                                        mm[7:4] ++;
                                    end
                                    else mm++;
                                    ss <= 8'h00;
                                end
                                else begin
                                    if(ss[3:0] == 4'h9) begin
                                        ss[3:0] <= 4'h0;
                                        ss[7:4] ++;
                                    end
                                    else ss++;                            
                                end
                            end
                        end
                endcase
            end
        end
    end
endmodule
```

## Lfsr5

```verilog
module top_module(
    input clk,
    input reset,    // Active-high synchronous reset to 5'h1
    output [4:0] q
);
    
    always @(posedge clk) begin
        if(reset) q <= 5'h1;
        else begin
            q[4] <= 1'b0 ^ q[0];
            q[3] <= q[4];
            q[2] <= q[3] ^ q[0];
            q[1] <= q[2];
            q[0] <= q[1];
        end
    end
endmodule
```

## Mt2015 lfsr

```verilog
module mux2(input sel, input d0, input d1, output out);
    always @(*) begin
        case(sel)
            1'b0: out = d0;
            1'b1: out = d1;
        endcase
    end
endmodule

module dff1(input clk, input d, output q);
    always @(posedge clk) begin
    	q <= d;
    end
endmodule

module onebit(input clk, input sel, input d0, input d1, output q);
    wire d_in;
    mux2 m(sel, d0, d1, d_in);
    dff1 d(clk, d_in, q);
endmodule

module top_module (
	input [2:0] SW,      // R
	input [1:0] KEY,     // L and clk
	output [2:0] LEDR);  // Q
	
    onebit o0(KEY[0],KEY[1],LEDR[2],SW[0],LEDR[0]);
    onebit o1(KEY[0],KEY[1],LEDR[0],SW[1],LEDR[1]);
    onebit o2(KEY[0],KEY[1],LEDR[2] ^ LEDR[1],SW[2],LEDR[2]);
endmodule
```

## Lfsr5

```verilog
module top_module(
    input clk,
    input reset,    // Active-high synchronous reset to 5'h1
    output [4:0] q
);
    
    always @(posedge clk) begin
        if(reset) q <= 5'h1;
        else begin
            q[4] <= 1'b0 ^ q[0];
            q[3] <= q[4];
            q[2] <= q[3] ^ q[0];
            q[1] <= q[2];
            q[0] <= q[1];
        end
    end
endmodule
```

## Lfsr32

```verilog
module top_module(
    input clk,
    input reset,    // Active-high synchronous reset to 32'h1
    output [31:0] q
); 

    always @(posedge clk) begin
        integer i;
        if(reset) q <= 32'h1;
        else begin
            q[31] <= q[0] ^ 1'b0;
            q[21] <= q[0] ^ q[22];
            q[1] <= q[0] ^ q[2];
            q[0] <= q[0] ^ q[1];
            
            for(i = 0; i < 32; i++) begin
                if(!(i == 31 || i == 21 || i == 1 || i == 0)) q[i] <= q[i+1];
            end
        end
    end
    
endmodule
```

## Exams/m2014 q4k

```verilog
module dffnr(input clk, input resetn, input d, output q);
    always @(posedge clk) begin
        if(resetn == 0) q <= 1'b0;
        else begin
        	q <= d;
        end
    end
endmodule

module top_module (
    input clk,
    input resetn,   // synchronous reset
    input in,
    output out);
    
    wire out3;
    wire out2;
    wire out1;
    
    dffnr d3(clk, resetn, in, out3);
    dffnr d2(clk, resetn, out3, out2);
    dffnr d1(clk, resetn, out2, out1);
    dffnr d0(clk, resetn, out1, out);
endmodule
```

## Exams/2014 q4a

```verilog
module dff1(input clk, input d, output reg Q);
    always  @(posedge clk) begin
        Q = d;
    end
endmodule

module mux1(input sel, input port0, input port1, output out);
    always @(*) begin
        case(sel)
            1'b0: out = port0;
            1'b1: out = port1;
        endcase
    end
endmodule

module top_module (
    input clk,
    input w, R, E, L,
    output Q
);
    wire q_in;
    wire mux_out;
    wire d_in;
    mux1(E,q_in,w,mux_out);
    mux1(L,mux_out,R,d_in);
    dff1(clk,d_in,q_in);
    assign Q = q_in;
endmodule
```

## Exams/2014 q4b

```verilog
module MUX1(input sel, input data0, input data1, output out);
    always @(*) begin
        if(sel == 1'b0) out = data0;
        else out = data1;
    end
endmodule

module DFF1(input clk, input D, output Q);
    always @(posedge clk) begin
        Q <= D;
    end
endmodule

module MUXDFF (input clk, input sel0, input data0, input data1, input sel1, input data2, output out);
    wire out1;
    wire d_in;
    
    MUX1(sel0, data0, data1, out1);
    MUX1(sel1, out1, data2, d_in);
    DFF1(clk, d_in, out);
endmodule

module top_module (
    input [3:0] SW,
    input [3:0] KEY,
    output [3:0] LEDR
); //
    //clk, sel0, data0, data1, sel1, data2, out
    MUXDFF(KEY[0],KEY[1],LEDR[3],KEY[3],KEY[2],SW[3],LEDR[3]);
    MUXDFF(KEY[0],KEY[1],LEDR[2],LEDR[3],KEY[2],SW[2],LEDR[2]);
    MUXDFF(KEY[0],KEY[1],LEDR[1],LEDR[2],KEY[2],SW[1],LEDR[1]);
    MUXDFF(KEY[0],KEY[1],LEDR[0],LEDR[1],KEY[2],SW[0],LEDR[0]);
endmodule
```

## Exams/m2014 q4k

```verilog
module dffnr(input clk, input resetn, input d, output q);
    always @(posedge clk) begin
        if(resetn == 0) q <= 1'b0;
        else begin
        	q <= d;
        end
    end
endmodule

module top_module (
    input clk,
    input resetn,   // synchronous reset
    input in,
    output out);
    
    wire out3;
    wire out2;
    wire out1;
    
    dffnr d3(clk, resetn, in, out3);
    dffnr d2(clk, resetn, out3, out2);
    dffnr d1(clk, resetn, out2, out1);
    dffnr d0(clk, resetn, out1, out);
endmodule
```

## Rule90

```verilog
module top_module(
    input clk,
    input load,
    input [511:0] data,
    output [511:0] q ); 
    
    always @(posedge clk) begin
        if(load) q <= data;
        else begin
            integer i;
            q[0] <= 0 ^ q[1];
            q[511] <= 0 ^ q[510];

            for(i = 1; i <= 510; i++) begin
                q[i] <= q[i-1] ^ q[i+1];
            end
        end
    end
endmodule
```

## Rule110

```verilog
module comp(input a, input b, input c, output s);
    assign s = (~b & c) | (~a & b) | (b & ~c);
endmodule

module top_module(
    input clk,
    input load,
    input [511:0] data,
    output [511:0] q
); 
    wire [511:0] next_q;
    
    generate
        genvar i;
        
        comp c1(q[1],q[0],next_q[0]);
        comp c2(0,q[511],q[510],next_q[511]);
        for(i = 1; i <= 510; i++) begin: comp_block
            comp (q[i+1],q[i],q[i-1],next_q[i]);
        end
    endgenerate
    
    always @(posedge clk) begin
        if(load) q <= data;
        else begin
        	q <= next_q;
        end
    end
endmodule
```

## Fsm1

```verilog
module top_module(
    input clk,
    input areset,    // Asynchronous reset to state B
    input in,
    output out);//  

    parameter A=0, B=1; 
    reg state, next_state;

    always @(*) begin    // This is a combinational always block
        // State transition logic
        next_state = (state & in) | (~state & ~in);
    end

    always @(posedge clk, posedge areset) begin    // This is a sequential always block
        // State flip-flops with asynchronous reset
        if(areset) state <= B;
        else begin
            state <= next_state;
        end
    end

    // Output logic
    // assign out = (state == ...);
    assign out = (state == B);
endmodule
```

## Exams/ece241 2013 q4

```verilog
module top_module (
    input clk,
    input reset,
    input [3:1] s,
    output fr3,
    output fr2,
    output fr1,
    output dfr
); 
    wire [1:0] next_state;
    wire [1:0] state;
    wire [1:0] past_state;
    
	// from s to state
    always @(*) begin
        if(reset) next_state = 2'd0;
        else begin
            case({s})
                3'b111: next_state = 2'd3;
                3'b011: next_state = 2'd2;
                3'b001: next_state = 2'd1;
                3'b000: next_state = 2'd0;
                default: next_state = 2'd0;
            endcase
        end
    end
    
    // from state to next_state
    always @(posedge clk) begin
        if(reset) begin
            past_state <= {2'd0};
            state <= {2'd0};
        end
        else begin
            past_state <= state;
        	state <= next_state;
        end
    end
    
    // output logic
    always @(*) begin
        fr1 = 0;
        fr2 = 0;
        fr3 = 0;

        casez({state,past_state})
            {2'd3,2'bzz}: begin
                dfr = 0;
            end
            {2'd2,2'd3}: begin
                fr1 = 1;
                dfr = 1;
            end
            {2'd2,2'd2}: begin
                fr1 = 1;
                
            end
            {2'd2,2'd1}: begin
                fr1 = 1;
                
                dfr = 0;
            end
            {2'd2,2'd0}: begin
                fr1 = 1;
                
                dfr = 0;
            end
            {2'd1,2'd3}: begin
                fr1 = 1;
                fr2 = 1;
                dfr = 1;
            end
            {2'd1,2'd2}: begin
                fr1 = 1;
                fr2 = 1;
                dfr = 1;
            end
            {2'd1,2'd1}: begin
                fr1 = 1;
                fr2 = 1;
            

            end
            {2'd1,2'd0}: begin
                fr1 = 1;
                fr2 = 1;
                
                dfr = 0;
            end
            {2'd0,2'bzz}: begin
                fr1 = 1;
                fr2 = 1;
                fr3 = 1;
                dfr = 1;
            end
        endcase
    end
endmodule
```

## Lemmings1

```verilog
module top_module(
    input clk,
    input areset,    // Freshly brainwashed Lemmings walk left.
    input bump_left,
    input bump_right,
    output walk_left,
    output walk_right); //  

    parameter LEFT=0, RIGHT=1;
    reg state, next_state;

    always @(*) begin
        // State transition logic
        if(state == LEFT) begin
            if(bump_left) next_state = RIGHT;
            else next_state = LEFT;
        end
        else begin
            if(bump_right) next_state = LEFT;
            else next_state = RIGHT;
        end
    end

    always @(posedge clk, posedge areset) begin
        // State flip-flops with asynchronous reset
        if(areset) state <= LEFT;
        else state <= next_state;
    end

    // Output logic
    // assign walk_left = (state == ...);
    // assign walk_right = (state == ...);
    assign walk_left = (state == LEFT);
    assign walk_right = (state == RIGHT);
endmodule
```

## Lemmings2

```verilog
module top_module(
    input clk,
    input areset,    // Freshly brainwashed Lemmings walk left.
    input bump_left,
    input bump_right,
    input ground,
    output walk_left,
    output walk_right,
    output aaah ); 
	// state parameter
    parameter LEFT = 2'd0, RIGHT = 2'd1, FALL_L = 2'd2, FALL_R = 2'd3;
    reg [1:0] state;
    reg [1:0] next_state;
    
    // state transition logic
    always @(*) begin
        if(state == LEFT) begin
            if(!ground) begin
            	next_state = FALL_L;
            end
            else begin
                if(bump_left) next_state = RIGHT;
                else next_state = LEFT;
            end
        end
        if(state == RIGHT) begin
            if(!ground) begin
                next_state = FALL_R;
            end
            else begin
                if(bump_right) next_state = LEFT;
                else next_state = RIGHT;
            end
        end
        if(state == FALL_L) begin
            if(ground) next_state = LEFT;
            else next_state = FALL_L;
        end
        if(state == FALL_R) begin
            if(ground) next_state = RIGHT;
            else next_state = FALL_R;
        end
    end
    
    // generate next_state
    always @(posedge clk, posedge areset) begin
        if(areset) state <= LEFT;
        else state <= next_state;
    end
    
    // output logic
    always @(*) begin
        walk_left = 0;
        walk_right = 0;
        if(state == LEFT) begin
        	walk_left = 1;
            walk_right = 0;
        end
        if(state == RIGHT) begin
        	walk_right = 1;
            walk_left = 0;
        end
        if(state == FALL_L | state == FALL_R) aaah = 1;
        else aaah = 0;
    end
endmodule
```

## Lemmings4

```verilog
module top_module(
    input clk,
    input areset,    // Freshly brainwashed Lemmings walk left.
    input bump_left,
    input bump_right,
    input ground,
    input dig,
    output walk_left,
    output walk_right,
    output aaah,
    output digging ); 
    // parameter and state register
    parameter LEFT = 0, RIGHT = 1, DIG_L = 2, DIG_R = 3, FALL_L = 4, FALL_R = 5, SPLAT = 6;
    reg [2:0] state, next_state;
    integer counter;
    
    // next state combination logic
    always @(*) begin
        next_state = state;
        case({state})
            LEFT: begin
                if(!ground) next_state = FALL_L;
                if(ground & dig) next_state = DIG_L;
                if(ground & !dig & bump_left) next_state = RIGHT;
            end
            DIG_L: begin
                if(!ground) next_state = FALL_L;
                if(ground & dig) next_state = DIG_L;
            end
            FALL_L: begin
                if(counter <= 20 & ground) next_state = LEFT;
                if(counter > 20 & ground) next_state = SPLAT;
            end
            RIGHT: begin
                if(!ground) next_state = FALL_R;
                if(ground & dig) next_state = DIG_R;
                if(ground & !dig & bump_right) next_state = LEFT;
            end
            DIG_R: begin
                if(!ground) next_state = FALL_R;
                if(ground & dig) next_state = DIG_R;                
            end
            FALL_R: begin
                if(counter <= 20 & ground) next_state = RIGHT;
                if(counter > 20 & ground) next_state = SPLAT;
            end
            SPLAT: begin
            end
        endcase
    end
    
    // generate next state(sequanetial logic)
    always @(posedge clk, posedge areset) begin
        if(areset) begin
            state <= LEFT;
            counter <= 0;
        end
        else begin
            state <= next_state;
            if(!ground) counter <= counter + 1;
            else counter <= 0;
        end
    end
    
    // output logic
    always @(*) begin
        walk_left = 0;
        walk_right = 0;
        aaah = 0;
        digging = 0;
        if(state == LEFT) walk_left = 1;
        if(state == RIGHT) walk_right = 1;
        if(state == DIG_L | state == DIG_R) digging = 1;
        if(state == FALL_L | state == FALL_R) aaah = 1;
    end
endmodule
```

## Fsm ps2

```verilog
module top_module(
    input clk,
    input [7:0] in,
    input reset,    // Synchronous reset
    output done); //

    reg [1:0] state;
    reg [1:0] next_state;
    
    // State transition logic (combinational)
    always @(*) begin
        if(state == 2'd0 && ~in[3]) next_state = 2'd0;
        if(state == 2'd0 && in[3]) next_state = 2'd1;
        if(state == 2'd1) next_state = 2'd2;
        if(state == 2'd2) next_state = 2'd3;
        if(state == 2'd3 && ~in[3]) next_state = 2'd0;
        if(state == 2'd3 && in[3]) next_state = 2'd1;
    end
    
    // State flip-flops (sequential)
    always @(posedge clk) begin
        if(reset) state <= 2'd0;
        else state <= next_state;
    end
    
    // Output logic
    assign done = (state == 2'd3);
endmodule
```

## Fsm ps2data

```verilog
module top_module(
    input clk,
    input [7:0] in,
    input reset,    // Synchronous reset
    output [23:0] out_bytes,
    output done); //

    reg [1:0] state;
    reg [1:0] next_state;
    wire [23:0] out_temp;
    
    // State transition logic (combinational)
    always @(*) begin
        if(state == 2'd0 && ~in[3]) next_state = 2'd0;
        if(state == 2'd0 && in[3]) begin
            next_state = 2'd1;
            out_temp[23:16] = in;
        end
        if(state == 2'd1) begin
            next_state = 2'd2;
            out_temp[15:8] = in;
        end
        if(state == 2'd2) begin
            next_state = 2'd3;
            out_temp[7:0] = in;
            out_bytes = out_temp;
        end
        if(state == 2'd3 && ~in[3]) begin
            // out_bytes = out_temp;
            next_state = 2'd0;
        end
        if(state == 2'd3 && in[3]) begin
            next_state = 2'd1;
            // out_bytes = out_temp;
            out_temp[23:16] = in;
        end
    end
    
    // State flip-flops (sequential)
    always @(posedge clk) begin
        if(reset) begin
            state <= 2'd0;
        end
        else state <= next_state;
    end
    
    // Output logic
    assign done = (state == 2'd3);
endmodule
```

## Fsm serial

```verilog
module top_module(
    input clk,
    input in,
    input reset,    // Synchronous reset
    output done
); 
    reg [3:0] state, next_state;
    
	// transition logic design
    always @(*) begin
        next_state = state;
        casez({state,in})
            {4'd0,1'b0}: next_state = 4'd1;
            {4'd0,1'b1}: next_state = 4'd0;
            {4'd1,1'bz}: next_state = 4'd2;
            {4'd2,1'bz}: next_state = 4'd3;
            {4'd3,1'bz}: next_state = 4'd4;
            {4'd4,1'bz}: next_state = 4'd5;
            {4'd5,1'bz}: next_state = 4'd6;
            {4'd6,1'bz}: next_state = 4'd7;
            {4'd7,1'bz}: next_state = 4'd8;
            {4'd8,1'bz}: next_state = 4'd9;
            {4'd9,1'b0}: next_state = 4'd11;
            {4'd9,1'b1}: next_state = 4'd10;
            {4'd10,1'b0}: next_state = 4'd1;
            {4'd10,1'b1}: next_state = 4'd0;
            {4'd11,1'b0}: next_state = 4'd11;
            {4'd11,1'b1}: next_state = 4'd0;
        endcase
    end
    
    // next state sequential logic
    always @(posedge clk) begin
        if(reset) state <= 4'd0;
        else state <= next_state;
    end
    // output logic
    assign done = (state == 4'd10);
endmodule
```

## Tb/clock

```verilog
module top_module ();
    reg clk;
    parameter PERIOD = 10;
    initial begin
    	clk = 0;
        forever #(PERIOD/2) clk = ~clk;
    end
    dut d(clk);
endmodule
```

## Tb/clock

```verilog
module top_module ();
    reg clk;
    parameter PERIOD = 10;
    initial begin
    	clk = 0;
        forever #(PERIOD/2) clk = ~clk;
    end
    dut d(clk);
endmodule
```

## Tb/tb1

```verilog
module top_module ( output reg A, output reg B );//

    // generate input patterns here
    initial begin
        A = 0; B = 0;
        #10 A = 1; B = 0;
        #5 A = 1; B = 1;
        #5 A = 0; B = 1;
        #20 A = 0; B = 0;
    end

endmodule
```

## Tb/and

```verilog
module top_module();
    reg [1:0] in;
    reg out;
    andgate a(in,out);
	initial begin  
        in[0] = 0; in[1] = 0; 
        #10 in[0] = 1; in[1] = 0;
        #10 in[0] = 0; in[1] = 1; 
        #10 in[0] = 1; in[1] = 1; 
    end
endmodule
```

## Tb/tb2

```verilog
module top_module();
    reg clk;
    parameter PERIOD = 5;
    reg in;
    reg [2:0] s;
    reg out;
    q7 q(clk,in,s,out);
	initial begin
    	clk = 0;
        forever #(PERIOD) clk=~clk;
    end
    
    initial begin
        in = 1'b0; s = 3'd2;
        #10 in = 1'b0; s = 3'd6;
        #10 in = 1'b1; s = 3'd2;
        #10 in = 1'b0; s = 3'd7;
        #10 in = 1'b1; s = 3'd0;
        #30 in = 1'b0; s = 3'd0;
    end
endmodule
```

## Exams/review2015 shiftcount

```verilog
module top_module (
    input clk,
    input shift_ena,
    input count_ena,
    input data,
    output [3:0] q);
    
    always @(posedge clk) begin
        if(shift_ena) begin
            q[3] <= q[2];
            q[2] <= q[1];
            q[1] <= q[0];
            q[0] <= data;
        end
        if(count_ena) q <= q - 1;
    end
endmodule
```

## Exams/review2015 fancytimer

```verilog
module shiftcount (
    input clk,
    input shift_ena,
    input count_ena,
    input data,
    output [3:0] q,
    output [31:0] countnum,
    output done_counting);
    
    always @(posedge clk) begin
        if(shift_ena) begin
            q[3] <= q[2];
            q[2] <= q[1];
            q[1] <= q[0];
            q[0] <= data;
        end
        if(count_ena) begin
            countnum ++;
        end
        else countnum <= 32'd0;
    end
    assign done_counting = (countnum == (q + 1) * 1000 - 1);
endmodule

module top_module (
    input clk,
    input reset,      // Synchronous reset
    input data,
    output [3:0] count,
    output counting,
    output done,
    input ack );
	
    reg [3:0] state, next_state;
    wire done_counting;
    wire shift_ena;
    reg [3:0] delay;
    reg [31:0] cnt;
    
	parameter S = 4'd0, S1 = 4'd1, S2 = 4'd2, S3 = 4'd3, B0 = 4'd4, B1 = 4'd5, B2 = 4'd6, B3 = 4'd7;
    parameter Count = 4'd8, Wait = 4'd9;
    
    shiftcount sc(clk, shift_ena, counting, data, delay, cnt, done_counting);
    assign count = delay - cnt / 1000;
        
    // calculate done_counting and counting
//    always @(*) begin
//        done_counting = (count == 4'hf);
//    end
    
    // next state logic
    always @(*) begin
        next_state = state;
        if(state == S) begin
            if(data == 0) next_state = S;
            if(data == 1) next_state = S1;
        end
        if(state == S1) begin
            if(data == 0) next_state = S;
            if(data == 1) next_state = S2;
        end
        if(state == S2) begin
            if(data == 0) next_state = S3;
            if(data == 1) next_state = S2;
        end
        if(state == S3) begin
            if(data == 0) next_state = S;
            if(data == 1) next_state = B0;
        end
        if(state == B0) begin
            next_state = B1;
        end
        if(state == B1) begin
            next_state = B2;
        end
        if(state == B2) begin
            next_state = B3;
        end
        if(state == B3) begin
            next_state = Count;
        end
        if(state == Count) begin
            if(done_counting) next_state = Wait;
            if(!done_counting) next_state = Count;
        end
        if(state == Wait) begin
            if(ack) next_state = S;
            if(!ack) next_state = Wait;
        end
    end
    
    // generate next state
    always @(posedge clk) begin
        if(reset) state <= S;
        else state <= next_state;
    end
    
    // output logic
    always @(*) begin
        shift_ena = (state == B0) | (state == B1) | (state == B2) | (state == B3);
        counting = (state == Count);
        done = (state == Wait);
    end
    
endmodule
```

## Cs450/counter 2bc

```verilog
module top_module(
    input clk,
    input areset,
    input train_valid,
    input train_taken,
    output [1:0] state
);
    parameter SN = 2'd0, WN = 2'd1, WT = 2'd2, ST = 2'd3;
    reg [1:0] next_state;
    
	// next state transition logic
    always @(*) begin
        next_state = state;
        if(train_valid == 1'b1) begin
            if(state == SN) begin
                next_state = (train_taken == 1'b0)? SN: WN;
            end
            if(state == WN) begin
                next_state = (train_taken == 1'b0)? SN: WT;
            end
            if(state == WT) begin
                next_state = (train_taken == 1'b0)? WN: ST;
            end
            if(state == ST) begin
                next_state = (train_taken == 1'b0)? WT:ST;
            end        
        end
    end
    // generate next state
    always @(posedge clk, posedge areset) begin
        if(areset) state <= WN;
        else state <= next_state;
    end
endmodule
```

## Cs450/history shift

```verilog
module top_module(
    input clk,
    input areset,

    input predict_valid,
    input predict_taken,
    output [31:0] predict_history,

    input train_mispredicted,
    input train_taken,
    input [31:0] train_history
);
    always @(posedge clk, posedge areset) begin
        if(areset) predict_history <= 32'd0;
        else begin
            if(train_mispredicted) begin
                predict_history <= {train_history[30:0], train_taken};
            end
            else if(predict_valid) begin
                predict_history <= {predict_history[30:0], predict_taken}; 
            end
        end
    end
endmodule
```

## Cs450/gshare

```verilog
module top_module(
    input clk,
    input areset,

    input  predict_valid, // 是否在预测，否则是训练，优先级低于train_mispredicted
    input  [6:0] predict_pc, // 当前预测的pc
    output predict_taken, // 新的预测分支指令
    output [6:0] predict_history, // 预测历史

    input train_valid, // 正在训练，需要更新counter_2bc
    input train_taken, // 训练的新值，输入到counter_2bc
    input train_mispredicted, // 预测失败，需要洗流水线
    input [6:0] train_history, // 预测失败后，预留的流水线历史
    input [6:0] train_pc // 训练的pc
);
    reg [1:0] pht [127:0]; // ghr表，每个是2个state，
    reg [6:0] predict_idx;
    reg [6:0] train_idx;
    reg [1:0] predict_state;
    // reg [6:0] ghr;
    
    integer i;
    
    // for generate pht[train_idx];
    parameter SN = 2'd0, WN = 2'd1, WT = 2'd2, ST = 2'd3;
    reg [1:0] next_state;
   
    // assign predict_history = ghr;
    
    assign predict_idx = predict_pc ^ predict_history;
    assign predict_taken = pht[predict_idx][1];
    assign train_idx = train_pc ^ train_history;
    
    always @(posedge clk, posedge areset) begin
        if(areset) begin
            predict_history <= 7'd0;
            for (i = 0; i < 128; i = i + 1) begin
                pht[i] <= WN; // 将所有PHT条目初始化为WN (2'b01)
            end
        end
        else begin
            if(train_valid) begin
                case(pht[train_idx])
                    SN: pht[train_idx] <= (train_taken == 1'b0)? SN: WN;
                    WN: pht[train_idx] <= (train_taken == 1'b0)? SN: WT;
                    WT: pht[train_idx] <= (train_taken == 1'b0)? WN: ST;
                    ST: pht[train_idx] <= (train_taken == 1'b0)? WT:ST;
                endcase
            end
            
            if(train_valid & train_mispredicted) begin
                predict_history <= {train_history[5:0], train_taken};
            end else if(predict_valid) begin
                predict_history <= {predict_history[5:0], predict_taken};
            end
        end
    end
endmodule
```


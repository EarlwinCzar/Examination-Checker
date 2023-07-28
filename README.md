## Examination-Checker
Exam checker

You can test this on this website: https://earlwinczar.github.io/Examination-Checker/

The goal of this program is to check the exmainers.

## Value to be entered
Input is given in the following format:

N
t_1 e_1 m_1 s_1 j_1 g_1
t_2 e_2 m_2 s_2 j_2 g_2
...

t_N e_N m_N s_N j_N g_N
・In the first line, an integer N representing the number of examinees is given.
・Of the following N lines, the i-th line (1 ≤ i ≤ N) contains a letter t_i representing the examinee&#39;s
classification of humanities and sciences, and integers e_i, m_i, s_i representing scores in English,
mathematics, science, Japanese, geography and history. , j_i, g_i are given in this order separated by
single-byte spaces.
・About t_i, humanities are represented by &quot;l&quot; (lowercase &quot;L&quot;), and science is represented by &quot;s&quot;.
・The input will be N + 1 lines in total, and one newline will be inserted at the end of the last line of
the input value.
Each value is passed as a string from standard input. Please check here for how to get the value from
the standard input

## Expected output

Please print in one line as an integer how many people can pass the two-step selection of the Tap
University entrance examination.

## Conditions

All test cases satisfy the following conditions.
・1 ≤ N ≤ 1,000
・For each i (1 ≤ i ≤ N)
・t_i is either &quot;l&quot; or &quot;s&quot; in lowercase letters
・0 ≤ e_i, m_i, s_i, j_i, g_i ≤ 100

# Welcome to Sonic Pi v2.10
use_synth :prophet
use_synth_defaults release: 0.1, amp: 2

use_bpm 120

M1 = 0

define :main do
  sleep 0.25
  play :D5+M1, sustain: 0.25
  sleep 0.5
  play :A4+M1, sustain: 0.25
  sleep 0.75
  play :Gs+M1, sustain: 0.25
  sleep 0.5
  play :G+M1, sustain: 0.25
  sleep 0.5
  play :F+M1, sustain: 0.5
  sleep 0.5
  play :D+M1, sustain: 0.25
  sleep 0.25
  play :F+M1, sustain: 0.25
  sleep 0.25
  play :G+M1, sustain: 0.25
end

define :run do
  play :D+M1, sustain: 0.25
  sleep 0.25
  play :D+M1, sustain: 0.25
  main
  sleep 0.25
  play :C+M1, sustain: 0.25
  sleep 0.25
  play :C+M1, sustain: 0.25
  main
  sleep 0.25
  play :B3+M1, sustain: 0.25
  sleep 0.25
  play :B3+M1, sustain: 0.25
  main
  sleep 0.25
  play :Bf3+M1, sustain: 0.25
  sleep 0.25
  play :Bf3+M1, sustain: 0.25
  main
end

define :bass do
  play BN
  sample :drum_bass_hard, amp: 2
  sleep 0.5
  play BN
  sample :elec_snare
  sleep 0.25
  play BN
  sleep 0.25
  play BN
  sleep 0.75
  play BN
  sample :drum_bass_hard, amp: 2
  sleep 0.5
  play BN
  sample :elec_snare
  sleep 0.25
  play BN
  sleep 0.25
  play BN
  sleep 0.25
  play BN
  sample :drum_bass_hard, amp: 2
  sleep 0.5
  play BN
  sample :drum_bass_hard, amp: 2
  sleep 0.5
  sample :elec_snare
end



run
in_thread do
  run
end
in_thread do
  BN = :D2
  bass
  BN = :C2
  bass
  BN = :B1
  bass
  BN = :Bf1
  bass
end

in_thread delay: 16 do
  M1 = 12
  run
end
in_thread delay: 16 do
  BN = :D2
  bass
  BN = :C2
  bass
  BN = :B1
  bass
  BN = :Bf1
  bass
end

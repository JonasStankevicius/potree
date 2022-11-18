#!/bin/bash

# var="your text"
# echo "simply put,
# just so: $var" > a.config

echo "first arg: $1, second arg: $2" > inference_args.txt

./PotreeConverter $1 $2 &
P1=$!

conda activate centerpoint
cd /mnt/c/git_repos/LineCenterPoint
python tools/inference_lines.py --las_file=$1 --output_folder=$2 &
P2=$!

wait $P1 $P2

cd /mnt/c/git_repos/potree
conda deactivate

exit
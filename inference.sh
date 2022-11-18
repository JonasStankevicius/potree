#!/bin/bash
echo "first arg: $1, second arg: $2" > inference_args.txt

conda activate centerpoint
cd /mnt/c/git_repos/LineCenterPoint
python tools/inference_lines.py --las_file=$1 --output_folder=$2

cd /mnt/c/git_repos/potree
conda deactivate

# python tools/inference_lines.py --las_file=/mnt/c/git_repos/potree/uploads/park.las --output_folder=/mnt/c/git_repos/potree/uploads/park.las_converted
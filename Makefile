DIRS = . ./js
COFFEE_SCRIPTS = $(basename $(foreach dir,$(DIRS),$(wildcard $(dir)/*.coffee)))
#GEN_POPUPS := $(basename $(shell find data/ ! -name "html.py" -name "*.py"))
PY_EXT=.py
PYTHON=python

CHDIR_SHELL := $(SHELL)
define chdir
   $(eval _D=$(firstword $(1) $(@D)))
   $(info $(MAKE): cd $(_D)) $(eval SHELL = cd $(_D); $(CHDIR_SHELL))
endef

.PHONY: all coffee_scripts
all:
	@$(MAKE) coffee_scripts

coffee_scripts:
	@echo "[*]Compile coffee scripts"
	@for script in $(COFFEE_SCRIPTS) ; do \
		# echo $(addsuffix .coffee,$$script) ; \
		# echo $(addsuffix .js,$$script); \
		coffee -b -p -c $(addsuffix .coffee,$$script) > $(addsuffix .js,$$script); \
	done
	@echo "[*]Done"
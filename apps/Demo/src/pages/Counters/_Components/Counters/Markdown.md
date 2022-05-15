---
setup: |

  //###  App  ###//
  import {UniqueID} from "Utilities/UniqueID.ts"
  
  //###  App.URLs  ###//
  import Log_URL from "Utilities/Log/index.ts?url"
  
  
  /* [ISSUE.8] restore when fixed */
  // const id              = UniqueID()
  // const CounterClass    = `Counter Markdown ID_${id}`
  // const CounterSelector = `.Counter.Markdown.ID_${id}`
  
  /* [ISSUE.8] remove when fixed */
  const CounterClass    = `Counter Markdown`
  const CounterSelector = `.Counter.Markdown`
  
---


<script type="module" define:vars={{CounterSelector, Log_URL}}>
  
  const {Log} = (await import(Log_URL))
  
  function initialize(){
    Log.Mount("Counter.Markdown")
      
    const $Root      = document.querySelector(CounterSelector)
    const $Count     = $Root.querySelector(".Count"    )
    const $Decrement = $Root.querySelector(".Decrement")
    const $Increment = $Root.querySelector(".Increment")

    let count = 0

    function decrement(){Log.Update("Counter.Markdown");  count--;  update_Result();}
    function increment(){Log.Update("Counter.Markdown");  count++;  update_Result();}

    function update_Result()
      {$Count.textContent = count}

    function bind_Events(){
      $Decrement.addEventListener("click", decrement)
      $Increment.addEventListener("click", increment)
    }

    bind_Events  ()
    update_Result()
  }
  
  /* [ISSUE.7] remove when fixed */
  const interval = setInterval(()=>{
    if(document.querySelector(CounterSelector)){
      initialize()
      clearInterval(interval)
    }
    else{
      console.error("[Mount.Fail] Counter.Markdown")
    }
  }, 100)
  
</script>


<div class={CounterClass}>

  <div class="Logo">
    <slot/>
  </div>

  <div class="Controls">
    <button class="Decrement">
      {"-"}
    </button>
    <div class="Count">
      {"0"}
    </div>
    <button class="Increment">
      {"+"}
    </button>
  </div>

</div>

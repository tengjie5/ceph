# This is an interface definition of classes that are generated within C++.
# Used by mypy to do proper type checking of mgr modules.
# Without this file, all classes have undefined base classes.

from typing import Any, Dict, List, Mapping, Optional, Sequence, Tuple, Union
try:
    from typing import Protocol  # Protocol was added in Python 3.8
except ImportError:
    class Protocol:  # type: ignore
        pass


class BasePyOSDMap(object):
    def _get_epoch(self): ...
    def _get_crush_version(self): ...
    def _dump(self):...
    def _new_incremental(self):...
    def _apply_incremental(self, inc: 'BasePyOSDMapIncremental'):...
    def _get_crush(self):...
    def _get_pools_by_take(self, take):...
    def _calc_pg_upmaps(self, inc, max_deviation, max_iterations, pool):...
    def _map_pool_pgs_up(self, poolid):...
    def _pg_to_up_acting_osds(self, pool_id, ps):...
    def _pool_raw_used_rate(self, pool_id):...
    @classmethod
    def _build_simple(cls, epoch: int, uuid: Optional[str], num_osd: int) -> 'BasePyOSDMap' :...

class BasePyOSDMapIncremental(object):
    def _get_epoch(self):...
    def _dump(self):...
    def _set_osd_reweights(self, weightmap):...
    def _set_crush_compat_weight_set_weights(self, weightmap):...

class BasePyCRUSH(object):
    def _dump(self):...
    def _get_item_weight(self, item):...
    def _get_item_name(self, item):...
    def _find_roots(self):...
    def _find_takes(self):...
    def _get_take_weight_osd_map(self, root):...

class BaseMgrStandbyModule(object):
    def __init__(self, capsule): pass
    def _ceph_get(self, data_name: str) -> Dict[str, Any]: ...
    def _ceph_get_mgr_id(self):...
    def _ceph_get_module_option(self, key, prefix=None):...
    def _ceph_get_option(self, key):...
    def _ceph_get_store(self, key):...
    def _ceph_get_active_uri(self):...


OptionValue = Optional[Union[bool, int, float, str]]


class CompletionT(Protocol):
    def complete(self, r: int, outb: str, outs: str) -> None: ...


ServerInfoT = Dict[str, Union[str, List[Dict[str, str]]]]
HealthCheckT = Mapping[str, Union[int, str, Sequence[str]]]
PerfCounterT = Dict[str, Any]

class BaseMgrModule(object):
    def __init__(self, py_modules_ptr: object, this_ptr: object) -> None: pass
    def _ceph_get_version(self) -> str: ...
    def _ceph_get_release_name(self) -> str: ...
    def _ceph_lookup_release_name(self, release: int) -> str: ...
    def _ceph_cluster_log(self, channel: str, priority: int, message: str) -> None: ...
    def _ceph_get_context(self) -> object: ...
    def _ceph_get(self, data_name: str) -> Any: ...
    def _ceph_get_server(self, hostname: Optional[str]) -> Union[ServerInfoT,
                                                                 List[ServerInfoT]]: ...
    def _ceph_get_perf_schema(self, svc_type: str, svc_name: str) -> Dict[str, Any]: ...
    def _ceph_get_rocksdb_version(self) -> str: ...
    def _ceph_get_counter(self, svc_type: str, svc_name: str, path: str) -> Dict[str, List[Tuple[float, int]]]: ...
    def _ceph_get_latest_counter(self, svc_type, svc_name, path): ...
    def _ceph_get_metadata(self, svc_type, svc_id): ...
    def _ceph_get_daemon_status(self, svc_type, svc_id): ...
    def _ceph_send_command(self,
                           result: CompletionT,
                           svc_type: str,
                           svc_id: str,
                           command: str,
                           tag: str,
                           inbuf: Optional[str]) -> None: ...
    def _ceph_set_health_checks(self, checks: Mapping[str, HealthCheckT]) -> None: ...
    def _ceph_get_mgr_id(self) -> str: ...
    def _ceph_get_ceph_conf_path(self) -> str: ...
    def _ceph_get_option(self, key: str) -> OptionValue: ...
    def _ceph_get_foreign_option(self, entity: str, key: str) -> OptionValue: ...
    def _ceph_get_module_option(self,
                                key: str,
                                default: str,
                                localized_prefix: str = "") -> OptionValue: ...
    def _ceph_get_store_prefix(self, key_prefix) -> Dict[str, str]: ...
    def _ceph_set_module_option(self, module: str, key: str, val: Optional[str]) -> None: ...
    def _ceph_set_store(self, key: str, val: Optional[str]) -> None: ...
    def _ceph_get_store(self, key: str) -> Optional[str]: ...
    # mgr actually imports OSDMap from mgr_module and constructs an OSDMap
    def _ceph_get_osdmap(self) -> BasePyOSDMap: ...
    def _ceph_set_uri(self, uri: str) -> None: ...
    def _ceph_set_device_wear_level(self, devid: str, val: float) -> None: ...
    def _ceph_have_mon_connection(self) -> bool: ...
    def _ceph_update_progress_event(self, evid: str, desc: str, progress: float, add_to_ceph_s: bool) -> None: ...
    def _ceph_complete_progress_event(self, evid: str) -> None: ...
    def _ceph_clear_all_progress_events(self) -> None: ...
    def _ceph_dispatch_remote(self, module_name: str, method_name: str, *args: Any, **kwargs: Any) -> Any: ...
    def _ceph_add_osd_perf_query(self, query: Dict[str, Dict[str, Any]]) -> Optional[int]: ...
    def _ceph_remove_osd_perf_query(self, query_id: int) -> None: ...
    def _ceph_get_osd_perf_counters(self, query_id: int) -> Optional[Dict[str, List[PerfCounterT]]]: ...
    def _ceph_add_mds_perf_query(self, query: Dict[str, Dict[str, Any]]) -> Optional[int]: ...
    def _ceph_remove_mds_perf_query(self, query_id: int) -> None: ...
    def _ceph_reregister_mds_perf_queries(self) -> None: ...
    def _ceph_get_mds_perf_counters(self, query_id: int) -> Optional[Dict[str, List[PerfCounterT]]]: ...
    def _ceph_unregister_client(self, name: Optional[str], addrs: str) -> None: ...
    def _ceph_register_client(self, name: Optional[str], addrs: str, replace: Optional[bool]) -> None: ...
    def _ceph_is_authorized(self, arguments: Dict[str, str]) -> bool: ...
    def _ceph_get_daemon_health_metrics(self) -> Dict[str, List[Dict[str, Any]]]: ...
